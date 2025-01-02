const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.route('/user:id')
    .get(userController.getUserbyId);

userRouter.route('/login')
    .get(userController.login);

module.exports = userRouter;