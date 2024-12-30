import { Location } from "../../location";
import { reportModel } from '../models/reportsModel';

export class reportController {
    static getReportsNearby = (req: { query: Location; }, 
        res: { json: (arg0: any) => void; 
            status: (arg0: number) => 
                { (): any; new(): any; send: { (arg0: any): void; new(): any; }; }; 
        }) => {
        
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
}
