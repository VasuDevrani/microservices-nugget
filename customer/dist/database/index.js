"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("./connection"));
const customer_repositoy_1 = __importDefault(require("./repository/customer.repositoy"));
exports.default = { databaseConnection: connection_1.default, CustomerRepository: customer_repositoy_1.default };
