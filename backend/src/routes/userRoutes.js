const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.route('/login')
    .get(userController.login);

userRouter.route('/token/:id')
    .get(userController.getUserbyToken);

userRouter.route('/:id')
    .get(userController.getUserbyUsername);

module.exports = userRouter;