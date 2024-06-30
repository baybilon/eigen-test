const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    code: { 
        type: String, 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
})

const MemberModel = mongoose.model('Member', MemberSchema)
module.exports = MemberModel