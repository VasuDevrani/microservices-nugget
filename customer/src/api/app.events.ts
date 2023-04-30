import { Express } from "express";
import CustomerService from "../services/customerService";

export default (app: Express) => {
    
    const service = new CustomerService();
    app.use('/app-events',async (req, res) => {

        const { payload } = req.body;

        //handle subscribe events
        // service.SubscribeEvents(payload);

        console.log("============= Shopping ================");
        console.log(payload);
        res.json(payload);

    });

}
