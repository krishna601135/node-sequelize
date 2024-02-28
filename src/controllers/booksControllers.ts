import { bookLogsService } from "../services/bookLogsService";
import { booksService } from "../services/booksService";
import { userService } from "../services/userService";
import { bookStatusEnums } from "../utils/enums";
import { response } from "../utils/response";
import { common } from "../utils/common";
import moment from 'moment';
import { bookInterface } from '../interfaces/interface';


class BooksController {
    /**
     * Method to get all books
     * @param req 
     * @param res 
     * @returns 
     */
    books = async (req, res) => {
        try {
            console.log("Books api Started");
            const condition: any = {};
            const projection = {
                bookName: 1, author: 1, type: 1,
                rating: 1, isAvailableForRent: 1,
                amount: 1
            };

            if (req.query.search) {
                condition['$or'] = [
                    { bookName: { $regex: req.query.search, $options: 'i' } },
                    // {author['name']: {name: {$regex: req.query.search, $options: 'i' }}},
                ];
            }

            if (req.query.type) {
                condition.type = { $regex: req.query.type, $options: 'i' }
            }

            if (req.query.rating) {
                condition['rating'] = { $gte: Number(req.query.rating) }
            }

            console.log(JSON.stringify(condition), "Condition.......");
            const books: any = await booksService.getAllBooks(condition, projection);
            console.log({
                jsonObject: books, description: "Books fetched from books model"
            });

            if (!books.length) {
                return response.error(req, res, {}, "Sorry! No books available for now...");
            }

            const returnObject = books.map((each) => {
                return {
                    name: each.bookName,
                    author: each.author.name,
                    isRentable: each.isAvailableForRent,
                    amount: each.amount,
                    genere: each.type
                }
            });
            return response.send(req, res, returnObject, "Success");

        } catch (err) {
            console.error({
                jsonObject: err,
                desription: "Catch Error at getting all books api" + err
            })
            return response.error(req, res, {}, "SOMETHING-WENT-WRONG");
        }
    }

    /**
     * Method to borrow a book
     * @param req 
     * @param res 
     * @returns 
     */
    borrowBook = async (req, res) => {
        try {
            const payload = req.body;
            const { user } = payload;

            const isPreviousBook = user.previousBooks.find(each => each === payload.bookId);

            // if the book is already in his previous list then not giving access to borrow again
            if (isPreviousBook)
                return response.error(req, res, {}, "Sorry! Book can't be available for second time borrow");

            // getting book details
            const book: any = await booksService.getBookById(payload.bookId);
            console.log({ jsonObject: book, description: "Book details from book model" });

            // throwing error if book is not available
            if (!book || book.quantity === 0)
                return response.error(req, res, {}, "Sorry! Requested book is not available");

            // restricting normal user to borrow special books
            if (!(book.isAvailableForRent || user.isPremiumActive))
                return response.error(req, res, {}, "Sorry! This book is for premium users only..");

            // calculating rent amount
            const rentAmount = common.calculateRentAmount(book.amount, user.isPremiumActive);
            const amount = common.getAmount(book.amount, rentAmount, 'borrow');
            console.log({ jsonObject: { amount, rentAmount } });

            // throwing error if amount and payload amount is not equal
            if (payload.amount && Number(payload.amount) !== amount) {
                return response.error(req, res, { payloadAmount: payload.amount, backendAmount: amount }, "Sorry! Book rent amount mis-match. Please check once...");
            }

            // taking fromDate from payload if have else taking today date 
            let fromDate = payload.fromDate ? payload.fromDate : moment().format('YYYY-MM-DD');
            // calculating dueDate based on pages
            const calculateDueDate = common.calculateDueDate(book.pages, fromDate);
            console.log({ JsonObject: { rentAmount, amount, calculateDueDate }, description: "Total borrow details..." });

            // insert obj to save in book logs model
            const createBookLogs = {
                bookId: book._id,
                userId: user._id,
                startTime: fromDate,
                dueTime: calculateDueDate,
                isDueTimeExtended: false,
                paidAmount: amount,
                rentAmount: rentAmount,
                returnAmount: amount - rentAmount,
                createdBy: "Sairam",
                modifiedDateTime: Date.now()
            }

            // updating books collection of a user in user model
            const updateUserBookData = await userService.updateUser({ _id: payload.userId }, { previousBooks: payload.bookId, modifiedDateTime: Date.now() });
            console.log({ jsonObject: updateUserBookData, description: "Updated previous book collection in book model" });

            // insertung the data into booklogs model
            const insertBookLogs = await bookLogsService.createBookLog(createBookLogs);
            console.log({ jsonObject: insertBookLogs, description: "Inserted data into book logs model.." });

            const returnObject = {
                userName: user.userName,
                bookName: book.bookName,
                startDate: fromDate,
                dueDate: calculateDueDate,
                paidAmount: amount,
                returnAmount: amount - rentAmount,
                isPremiumSub: user.isPremiumActive
            };
            return response.send(req, res, returnObject, "Success");
        } catch (err) {
            console.log("Error in boorowBook API catch Block" + err);
            return response.error(req, res, {}, "SOMETHING-WENT-WRONG")
        }
    }

    /**
     * Method to return a book
     * @param req 
     * @param res 
     * @returns 
     */
    returnBook = async (req, res) => {
        try {
            console.log("Return book API starts..");
            const payload = req.body;
            const { userId, bookId, user } = payload;
            console.log({ jsonObject: payload, description: "Payload....." });

            // getting book details
            const book = await booksService.getBookById(bookId);

            // throwing error if user or book not found!
            if (!user || !book) {
                return response.error(req, res, {}, "Sorry! No details found with the providing details");
            }

            // getting book log details from bookLogs model
            let getBookDetailsWithUserId = await bookLogsService.getBookLog({ userId, bookId, status: bookStatusEnums['taken'] });
            console.log({ jsonObject: getBookDetailsWithUserId, description: "Book log deatils by userId and bookId" });
            getBookDetailsWithUserId = JSON.parse(JSON.stringify(getBookDetailsWithUserId));

            if (!getBookDetailsWithUserId) {
                return response.error(req, res, {}, "Sorry! No records are not there currently...");
            }

            // checkoing that due time is extended or not
            const isDueTimeExtended = common.isDueTimeExtended(getBookDetailsWithUserId.dueTime);

            // update object that will update the date in bookLogs model
            const bookLogsUpdateData: any = {
                status: bookStatusEnums.returned,
                bookReturnedOn: new Date(),
                isDueTimeExtended: false
            }

            // return object that has to be send to end user
            const returnObj: any = {
                bookId,
                userId,
                returnAmount: getBookDetailsWithUserId.returnAmount
            }

            console.log({ jsonObject: { user, book }, description: "UserDetails fro user model.." });

            // if due time is extended than deducting the amount from return amount
            if (!isDueTimeExtended) {
                bookLogsUpdateData.isDueTimeExtended = true;
                const isPremiumUser = user?.isPremiumActive;
                const rentAmount = isPremiumUser ? 0 : common.calculateRentAmount(book?.amount, false);
                const daysExtended = common.differenceIn2Dates(new Date(), getBookDetailsWithUserId.dueTime);
                const finalAmount = Number(getBookDetailsWithUserId.returnAmount) - (daysExtended * Number(rentAmount));
                returnObj.returnAmount = finalAmount;
            }

            // updating the book logs data 
            const updateStatusBookLogs = await bookLogsService.updateBookLog({ userId, bookId, status: bookStatusEnums['taken'] }, bookLogsUpdateData);
            console.log({ jsonObject: updateStatusBookLogs, description: "Updated result fo book logs model" });

            return response.send(req, res, returnObj, "Success! See you soon");
        } catch (err) {
            console.log("Catch Block error in return book api" + err);
            return response.error(req, res, {}, "SOMETHING-WENT-WRONG");
        }
    }

    /**
     * Method to give rating
     * @param req 
     * @param res 
     * @returns 
     */
    ratingBook = async (req, res) => {
        try {
            console.log("Rating Book API starts...");
            const { bookId, user, rating }: bookInterface = req.body;
            const {userId} = user;
            console.log({jsonObject: bookId, userId, rating, description: "Payload from User"})

            // condition to get book logs
            const condition = { bookId, userId, status: bookStatusEnums.returned };

            // getting book logs
            const getBookLogs = await bookLogsService.getBookLog(condition);
            console.log({ jsonObject: getBookLogs, description: "Book Logs with userid and bookid" });

            // throwing error if book logs not get
            if (!getBookLogs)
                return response.error(req, res, {}, "Sorry! You can't give the rating for this book!");

            // updating book logs data with given rating
            const updateRating = await bookLogsService.updateBookLog(condition, {rating, modifiedDateTime: new Date()});
            console.log({jsonObject: updateRating, description: "updated Rating for a book"});

            if (!updateRating)
                return response.error(req, res, {}, 'Sorry! Updation Failed');
            return response.send(req, res, {}, "Success! Your rating has been submitted");
        } catch (err) {
            console.log("Catch Block error in return book api" + err);
            return response.error(req, res, {}, "SOMETHING-WENT-WRONG");
        }
    }
}

export const booksController = new BooksController();