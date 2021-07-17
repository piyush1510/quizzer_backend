const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({
    by:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    answers:{
        type:[Object],
    }
})
module.exports = mongoose.model('Response',quizSchema)