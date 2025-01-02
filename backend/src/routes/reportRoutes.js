import express from 'express';
const router = express.Router();
import { reportController } from '../controllers/reportController.js';

//router.route('/').get(reportController.getReportsNearby);

router.route('/')
    .get(reportController.getAllReports)
    .post(reportController.createReport)
router.route('/:id')
    .put(reportController.updateReport)
    .delete(reportController.deleteReport)

export const reportRouter = router;

//module.exports = router ;