const mongoose = require('mongoose');

const entrydate = new Date();
const returndate = new Date(entrydate);
returndate.setDate(returndate.getDate() + 7);

const BorrowSchema = new mongoose.Schema({
    memberCode: { 
        type: String, 
        required: true 
    },
    bookCode: { 
        type: String, 
        required: true 
    },
    enrtryDate:{
        type: Date,
        default: entrydate
    },
    returnDate:{
        type: Date,
        default: returndate
    }
})

const BorrowModel = mongoose.model('Borrow', BorrowSchema)
module.exports = BorrowModel