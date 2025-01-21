const { reportModel } = require('../models/reportsModel.js');

exports.getReportsNearby = (req, res) => {
    const location = req.query.location;
    const latitudeRange = [location.latitude - 1, parseFloat(location.latitude) + 1]
    const longitudeRange = [location.longitude - 1, parseFloat(location.longitude) + 1]

    reportModel.find()
        .where('location.latitude').lte(latitudeRange[1]).gte(latitudeRange[0])
        .where('location.longitude').lte(longitudeRange[1]).gte(latitudeRange[0])
        .sort('date')
        .then(docs => {
            res.json(docs);
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

exports.getAllReports = (res) =>{
    reportModel.find()
        .then(docs=>{
            res.json(docs)
        })
        .catch(err=>{
            res.satus(500).send(err)
        })
}

exports.getOnlyVerifiedReports = (res) =>{
    reportModel.find()
        .where('riskLevel').gte(1)
        .then(docs=>{
            res.json(docs);
        })
        .catch(err=>{
            res.status(500).send(err)
        })
}

exports.updateReport = (req, res) => {
    const { id } = req.params.id; // Get the report ID from the request parameters
    const updateData = req.body; // Get the updated data from the request body

    reportModel
        .findOneAndUpdate({ id }, updateData, { new: true }) // { new: true } returns the updated document
        .then((updatedReport) => {
            if (!updatedReport) {
                return res.status(404).send({ message: 'Report not found' });
            }
            res.json(updatedReport);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
}

exports.deleteReport = (req, res) => {
    reportModel.findByIdAndDelete(req.params.id)
        .then(doc => {
            if (!doc) {
                return res.status(404).send('report not found');
            }
            res.json({ message: 'report deleted' });
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

exports.createReport = (req, res) => {
    const reportData = req.body; // Get the report data from the request body
    console.log(req.body)

    const newReport = new reportModel(reportData);

    newReport
      .save()
      .then((savedReport) => {
        res.status(201).json(savedReport); // Respond with the created report and 201 status
      })
      .catch((err) => {
        res.status(500).send(err);
      });
};
