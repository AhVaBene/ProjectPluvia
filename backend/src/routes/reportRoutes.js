const express = require('express');
const reportRouter = express.Router();
const reportController = require('../controllers/reportController');

//router.route('/').get(reportController.getReportsNearby);

reportRouter.route('/').get(reportController.getAllReports)

reportRouter.route('/createReport').post(reportController.createReport)

reportRouter.route('/report/:id')
    .get(reportController.getReportById)
    .put(reportController.updateReport)
    .delete(reportController.deleteReport)

module.exports = reportRouter;