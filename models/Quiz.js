const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    createdBy:{
        type:String,
        required:true
    },
    questions:{
        type:[Object],
    },
    responses:{
        type:[Object],
    }
})
module.exports = mongoose.model('Quiz',quizSchema)