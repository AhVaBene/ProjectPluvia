const express = require('express');
const reportRouter = express.Router();
const reportController = require('../controllers/reportController');

reportRouter.route('/report')
    .get(reportController.getAllReports)
    .post(reportController.createReport);

reportRouter.route('/search').get(reportController.searchReport)

reportRouter.route('/home')
    .get(reportController.getReportsNearby);

reportRouter.route('/notifications')
    .get(reportController.getNotifications)

reportRouter.route('/:id')
    .put(reportController.updateReport)
    .delete(reportController.deleteReport)

module.exports = reportRouter;