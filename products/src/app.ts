import express, {Express} from 'express'
import cors from 'cors'
import products from './api';
import { CreateChannel } from './utils';

export default async(app: Express) => {
    app.use(express.json());
    app.use(cors());
    // app.use(express.static(__dirname + '/public'));
    const channel = await CreateChannel();

    products(app, channel);
}