"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ProductSchema = new Schema({
    name: String,
    desc: String,
    banner: String,
    type: String,
    unit: Number,
    price: Number,
    available: Boolean,
    suplier: String
});
exports.default = mongoose_1.default.model('product', ProductSchema);
