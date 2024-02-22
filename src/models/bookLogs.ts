import * as mongoose from 'mongoose';
import { bookModel } from './books';
import { userModel } from './user';

const bookLog = new mongoose.Schema({
    bookId: {type: String, ref: bookModel},
    userId: {type: String, ref: userModel},
    startTime: {type: Date},
    dueTime: {type: Date},
    isDueTimeExtended: {type: Boolean},
    paidAmount: {type: Number},
    rentAmount: {type: Number},
    returnAmount: {type: Number, default: 0},
    createdBy: {type: String}, 
    modifiedBy: {type: String},
    createdDateTime: {type: Date, default: Date.now()},
    modifiedDateTime: {type: Date}
});

export const bookLogModel = mongoose.model('bookLog', bookLog);