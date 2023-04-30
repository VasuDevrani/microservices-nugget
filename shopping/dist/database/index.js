"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("./connection"));
const shopping_repositoy_1 = __importDefault(require("./repository/shopping.repositoy"));
exports.default = { databaseConnection: connection_1.default, ShoppingRespository: shopping_repositoy_1.default };
