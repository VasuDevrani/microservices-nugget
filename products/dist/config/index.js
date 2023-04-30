"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (process.env.NODE_ENV !== 'prod') {
    const configFile = `../.env.${process.env.NODE_ENV}`;
    dotenv_1.default.config({ path: configFile });
}
else {
    dotenv_1.default.config();
}
exports.default = {
    PORT: process.env.PORT || 5000,
    DB_URL: process.env.MONGO_URI,
    APP_SECRET: process.env.APP_SECRET,
    EXCHANGE_NAME: process.env.EXCHANGE_NAME,
    MSG_QUEUE_URL: process.env.MSG_QUEUE_URL,
    CUSTOMER_SERVICE: "customer_service",
    SHOPPING_SERVICE: "shopping_service",
};
