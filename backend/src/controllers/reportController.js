const { reportModel } = require('../models/reportsModel.js');

exports.getReportsNearby = (req, res) => {
    console.log(req)
    const location = req.query.location;
    const minRiskLevel = req.query.isAdmin ? 0 : 1

    console.log(minRiskLevel)
    reportModel.find()
        .where('riskLevel').gte(minRiskLevel)
        .where('location.latitude').gte(Number(location.latitude - 1)).lte(Number(parseFloat(location.latitude) + 1))
        .where('location.longitude').gte(Number(location.longitude - 1)).lte(Number(parseFloat(location.longitude) + 1))
        .sort('-date')
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
    const filter = { id: req.params.id }; // Get the report ID from the request parameters
    const updateData = req.body.data; // Get the updated data from the request body
    console.log(updateData)

    reportModel
        .findOneAndUpdate(filter, updateData, { new: true }) // { new: true } returns the updated document
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

exports.getNotifications = (req, res) =>  {
    const locations = req.query.locations;
    const reports = [] //da cambiare in set(?)

    const currentDate = new Date();
    var yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);

    var query = new Promise((resolve, reject) => {
        locations.forEach((e, index, array) => {
            reportModel.find()
                .where('date').gte(yesterday).lte(currentDate)
                //.where('riskLeve').gte(2)
                .where('location.latitude').gte(Number(e.latitude - 1)).lte(Number(parseFloat(e.latitude) + 1))
                .where('location.longitude').gte(Number(e.longitude - 1)).lte(Number(parseFloat(e.longitude) + 1))
                .sort('-date')
                .then(docs => {
                    docs.forEach(r => reports.push(r))
                    if (index === array.length -1) resolve();
                })
                .catch(err => {
                    return res.status(500).send(err);
                });
        });
    })

    query.then(() => {
        var result = reports.reduce((unique, o) => {
            if(!unique.some(obj => obj.id === o.id)) {
              unique.push(o);
            }
            return unique;
        },[]);
        res.json(result)
    })
}
