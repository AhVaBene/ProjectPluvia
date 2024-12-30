import { Location } from "../../location";
import { reportModel } from '../models/reportsModel';

export class userController {
    static getUserbyId = (req: { params: { id: String; }; }, res) => {
        reportModel.find()
        .where('id').equals(req.params.id)
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
    static login = (req: { query: { username: String; password: String; }; }, res) => {
        reportModel.find()
        .where('id').equals(req.query.username)
        .where('password').equals(req.query.password)
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
