import express from 'express';
const router = express.Router();
import { reportController } from '../controllers/reportController';

router.route('/')
    .get(reportController.getReportsNearby);

export const reportRouter = router;