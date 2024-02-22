import * as mongoose from 'mongoose';
import { bookModel } from './books';


const addressModel = new mongoose.Schema({
    locality: {type: String},
    area: {type: String},
    pincode: {type: Number},
    city: {type: String},
    district: {type: String}
})

const user = new mongoose.Schema({
    userName: {type:String},
    emailId: {type: String},
    phoneNo: {type: String},
    adharNo: {type: String},
    address: addressModel,
    age: {type: Number},
    prefferedGeneres: [{type: String}],
    previousBooks: [{type: String, ref: bookModel}],
    booksInterested: [{type: String, ref: bookModel}],
    isPremiumActive: {type: Boolean},
    createdBy: {type: String},
    modifiedBy: {type: String},
    createdDateTime: {type: Date, default: Date.now()},
    modifiedDateTime: {type: Date}
})


export const userModel = mongoose.model('user', user);