import express from 'express';
const router = express.Router();
import { userController } from '../controllers/userController';

router.route('/user:id')
    .get(userController.getUserbyId);

router.route('/login')
    .get(userController.login);

export const userRouter = router;