const Quiz = require('../models/Quiz')
const Response = require('../models/Response')

exports.createQuiz = async (req, res) => {
    var {
        name,
        description,
        questions
    } = req.body;
    //validate
    createdBy = req.user._id;
    const newQuiz = new Quiz({
        name,
        description,
        questions,
        createdBy,
        responses: []
    })
    await newQuiz.save();

    res.json({
        message: `new quiz "${name}" created `
    })
}
exports.deleteQuiz = async (req, res) => {
    userId = req.user._id
    quizId = req.params.id
    try {
        await Quiz.deleteOne({
            _id: quizId,
            createdBy: userId
        })
        res.json({
            message: "deleted"
        });
    } catch (err) {
        console.log(err.message)
        res.sendStatus(404);
    }
    Quiz.remove()
}
exports.getOneQuiz = async (req, res) => {
    quizId = req.params.id;
    try {
        const quiz = await Quiz.findOne({
            _id: quizId
        })
        res.json(quiz)
    } catch (err) {
        res.sendStatus(404)
    }
}
exports.answerQuiz = async (req, res) => {
    quizId = req.params.id;
    userId = req.user._id;
    answers = req.body.answers
    try {
        const quiz = await Quiz.findOne({
            _id: quizId
        })
        if (!quiz) return res.sendStatus(404)
        // validating the response
        // length
        if (quiz.questions.length !== answers.length) return res.sendStatus(404)
        //type validation
        for (let i in answers) {
            if (quiz.questions[i].type === 'mcq') {
                if (typeof answers[i] !== 'number' || quiz.questions[i].options.length <= answers[i])
                    return res.json(i)
            } else if (quiz.questions[i].type === 'essay') {
                if (typeof answers[i] !== 'string')
                    return res.json(i)
            } else return res.sendStatus(403)
        }
        ////######
        // saving the response
        console.log({
            by:userId,
            to:quizId,
            answers
        });
        var newResponse = new Response({
            by:userId,
            to:quizId,
            answers
        })
        // saved the response
        newResponse =await newResponse.save();
        // adding the response to quiz
        quiz.responses.push(newResponse._id);
        await quiz.save();
        res.json("saved")
    } catch (err) {
        res.json(err.message)
    }
}