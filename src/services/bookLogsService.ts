import { bookLogModel } from "../models/bookLogs";

class BookLogsService {
    /**
     * method to create a document in mongo model
     * @param data 
     * @returns 
     */
    async createBookLog (data) {
        try {
            const insertData = await bookLogModel.create(data);
            return insertData;
        } catch (err) {
            console.log("Catch block error while inserting");
            return;
        }

    }

    async getBookLog (condition, projection = {}) {
        try {
            const data = await bookLogModel.findOne(condition, projection);
            return data;
        } catch (err) {
            console.log("Cacth block error while getting");
            return;
        }
    }

    async updateBookLog (condition, data) {
        try {
            const updateData = await bookLogModel.findOneAndUpdate(condition, data);
            return updateData;
        } catch (err) {
            console.log('Catch block error while updating bookLog');
            return;
        }
    }
}

export const bookLogsService = new BookLogsService();