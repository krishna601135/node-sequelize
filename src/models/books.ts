import * as mongose from 'mongoose';


const authorSchema= new mongose.Schema({
    name: {type: String},
    country: {type: String},
    origin: {type: String},
    dob: {type: Date},
    previousWork: [{type: String, ref: this}],
    avatar: {type: String}
}, {_id: false})

const bookSchema = new mongose.Schema({
    bookName: {type: String},
    author: authorSchema,
    type: {type: String},
    publishedOn: {type: Date},
    rating: {type: Number},
    pages: {type: Number},
    isAvailableForRent: {type: Boolean},
    amount: {type: Number},
    quantity: {type: Number},
    createdBy: {type: String},
    modifiedBy: {type: String},
    createdDateTime: { type: Date, default: Date.now },
    modifiedDateTime: {type: Date},
})

export const bookModel = mongose.model('books', bookSchema);