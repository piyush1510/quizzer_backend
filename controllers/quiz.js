const Quiz = require('../models/Quiz')

exports.createQuiz = async (req,res)=>{
    var {name,description,questions}= req.body;
    //validate
    createdBy=req.user._id;
    const newQuiz = new Quiz({
        name,
        description,
        questions,
        createdBy,
        responses:[]
    })
    await newQuiz.save();
    
    res.json({message:`new quiz "${name}" created `})
}