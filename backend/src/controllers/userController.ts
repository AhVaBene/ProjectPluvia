import { Location } from "../../location";
import { reportModel } from '../models/reportsModel';

export class userController {
    static getUserbyId = (req, res) => {
        reportModel.findById(req.params.id)
        .then(doc => {
            if (!doc) {
                return res.status(404).send('User not found');
            }
            res.json(doc);
        })
        .catch(err => {
            res.status(500).send(err);
        });
    }
}
