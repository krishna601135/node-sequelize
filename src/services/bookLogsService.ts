import { bookLogModel } from "../models/bookLogs";

class BookLogsService {
    /**
     * method to create a document in mongo model
     * @param data 
     * @returns 
     */
    createBookLog (data) {
        try {
            const insertData = bookLogModel.create(data);
            return insertData;
        } catch (err) {
            console.log("Catch block error while inserting");
            return;
        }

    }
}

export const bookLogsService = new BookLogsService();