const { reportModel } = require('../models/reportsModel.js');
const multer = require('multer');
const { randomUUID } = require('crypto');
const path = require('path');


exports.getReportsNearby = (req, res) => {
    const location = req.query.location;
    const minRiskLevel = req.query.isAdmin ? 0 : 1

    reportModel.find()
        .where('riskLevel').gte(minRiskLevel)
        .where('location.latitude').gte(Number(location.latitude - 0.6)).lte(Number(parseFloat(location.latitude) + 0.6))
        .where('location.longitude').gte(Number(location.longitude - 0.6)).lte(Number(parseFloat(location.longitude) + 0.6))
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


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Set the directory where files will be stored
    },
    filename: (req, file, cb) => {
      // Use the original file name and add its extension
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname); // Extract the original file extension
      const baseName = path.basename(file.originalname, ext); // Extract the base name without the extension
  
      cb(null, `${baseName}-${uniqueSuffix}${ext}`); // Create a unique filename
    }
  });

const upload = multer({storage});

exports.createReport = [upload.single('file'),(req, res) => {
    console.log("REPORT UPLOAD")

    const reportData = req.formData; // Get the report data from the request body
    console.log(req.file)
    console.log(req.body)
    console.log(req.file.path)

    const report = {
        id: randomUUID(),
        location: JSON.parse(req.body.location),
        pic: req.file.path,
        riskLevel: 0,
        date: new Date(req.body.date),
        username: req.body.username
    }

    const newReport = new reportModel(report);

    newReport
      .save()
      .then((savedReport) => {
        res.status(201).json(savedReport); // Respond with the created report and 201 status
      })
      .catch((err) => {
        res.status(500).send(err);
      });
}]

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
                .where('riskLevel').gte(2)
                .where('location.latitude').gte(Number(e.latitude - 0.6)).lte(Number(parseFloat(e.latitude) + 0.6))
                .where('location.longitude').gte(Number(e.longitude - 0.6)).lte(Number(parseFloat(e.longitude) + 0.6))
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
