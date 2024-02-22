import { bookModel } from "../models/books";


class BooksService {
    getAllBooks = async (condition, projection) => {
        try {
            const result = await bookModel.find(condition, projection);
            return result;
        } catch (err) {
            console.error({
                error: err,
                description: 'Error in Saving Mongo'
            });
            return;
        }
    }

    getBookById = async (id: string, projection = {}) => {
        try {
            const result = await bookModel.findById(id, projection);
            return result;
        } catch (err) {
            console.error({
                error: err,
                description: 'Error in Saving Mongo'
            });
            return;
        }
    }
}

export const booksService = new BooksService();