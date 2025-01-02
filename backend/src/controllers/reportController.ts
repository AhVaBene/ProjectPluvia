import { Location } from "../../location";
import { reportModel } from '../models/reportsModel';

export class reportController {
    static getReportsNearby = (req: { query: Location; }, res) => {
        let location: Location = req.query;

        reportModel.find()
            .where('address.latitude').gte(location.latitude - 100)
            .lte(location.latitude + 100)
            .where('address.longitude').gte(location.longitude - 100)
            .lte(location.longitude + 100)
            .sort('date')
            //.limit(20)
            .then(docs => {
                res.json(docs);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    }

    static getAllReports = (res) =>{
        reportModel.find()
        .then(docs=>{
            res.json(docs)
        })
        .catch(err=>{
            res.satus(500).send(err)
        })
    }

    static getOnlyVerifiedReports = (res) =>{
        reportModel.find()
        .where('riskLevel').gte(1)
        .then(docs=>{
            res.json(docs);
        })
        .catch(err=>{
            res.status(500).send(err)
        })
    }

    static updateReport = (req, res) => {
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
      };

      static deleteReport = (req, res) => {
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

      static createReport = (req, res) => {
        const reportData = req.body; // Get the report data from the request body
        console.log(req.body)

        //const newReport = new reportModel(reportData);
    
        // newReport
        //   .save()
        //   .then((savedReport) => {
        //     res.status(201).json(savedReport); // Respond with the created report and 201 status
        //   })
        //   .catch((err) => {
        //     res.status(500).send(err);
        //   });
      };
    
}
