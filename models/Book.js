const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    code: { 
        type: String, 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    author: { 
        type: String, 
        required: true 
    },
    stock: { 
        type: Number, 
        required: true 
    },
})

const BookModel = mongoose.model('Book', BookSchema)
module.exports = BookModel