const mongoose = require('mongoose');

// const entrydate = new Date();
// const returndate = entrydate.setDate(entrydate.getDate() + 7);

const ReturnSchema = new mongoose.Schema({
    memberCode: { 
        type: String, 
        required: true 
    },
    bookCode: { 
        type: String, 
        required: true 
    },
    // returnDate:{
    //     type: Date,
    //     required: true
    // },
    returnedDate:{
        type: Date,
        required: true
        // default: entrydate
    },
    status:{
        type: String,
        default: ""
    }
})

const ReturnModel = mongoose.model('Return', ReturnSchema)
module.exports = ReturnModel