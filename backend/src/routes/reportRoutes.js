const express = require('express');
const reportRouter = express.Router();
const reportController = require('../controllers/reportController');

//router.route('/').get(reportController.getReportsNearby);

reportRouter.route('/')
    .get(reportController.getAllReports)
    .post(reportController.createReport);

reportRouter.route('/:id')
    .put(reportController.updateReport)
    .delete(reportController.deleteReport)

module.exports = reportRouter;