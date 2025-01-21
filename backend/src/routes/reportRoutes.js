const express = require('express');
const reportRouter = express.Router();
const reportController = require('../controllers/reportController');

reportRouter.route('/')
    .get(reportController.getAllReports)
    .post(reportController.createReport);

reportRouter.route('/home')
    .get(reportController.getReportsNearby);

reportRouter.route('/:id')
    .put(reportController.updateReport)
    .delete(reportController.deleteReport)

module.exports = reportRouter;