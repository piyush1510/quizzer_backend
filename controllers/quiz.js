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
exports.deleteQuiz = async (req,res) =>{
    userId=req.user._id
    quizId=req.params.id
    try{
        await Quiz.deleteOne({_id:quizId,createdBy:userId})
        res.json({message:"deleted"});
    }catch(err){
        console.log(err.message)
        res.sendStatus(404);
    }
    Quiz.remove()
}
exports.getOneQuiz = async (req,res)=>{
    quizId=req.params.id;
    try {
       const quiz=await Quiz.findOne({_id:quizId})
       res.json(quiz)
    } catch (err) {
        res.sendStatus(404)
    }
}