  
const router = require('express').Router();
const userController = require('../controllers/user')


router
    .post('/login',userController.login)
    .post('/signup',userController.signUp)
    .use(userController.authenticate)
    .post('/create/',userController.createQuiz)
    .delete('/delete/:id',userController.deleteQuiz)
    .get('/quiz',userController.getAllQuiz)
    .get('/quiz/:id',userController.getOneQuiz)
module.exports = router;