const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.route('/login')
    .get(userController.login);

userRouter.route('/register')
    .post(userController.register);

userRouter.route('/token/:id')
    .get(userController.getUserbyToken);

userRouter.route('/profile/:id')
    .get(userController.getUserbyUsername)
    .put(userController.updateProfile);

module.exports = userRouter;