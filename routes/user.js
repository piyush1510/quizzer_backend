  
const router = require('express').Router();
const userController = require('../controllers/user')


router
    .post('/login',userController.login)
    .post('/signup',userController.signUp)
module.exports = router;