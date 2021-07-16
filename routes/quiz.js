  
const router = require('express').Router();
const quizController = require('../controllers/quiz')
const userController = require('../controllers/user')


router
    .use(userController.authenticate)
    .post('/create',quizController.createQuiz)
    .delete('/delete/:id',quizController.deleteQuiz)
    .get('/quiz/:id',quizController.getOneQuiz)
    .post('/answer',quizController.answerQuiz)
module.exports = router;