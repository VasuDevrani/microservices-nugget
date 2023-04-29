"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CartSchema = new mongoose_1.default.Schema({
    customerId: { type: String },
    items: [
        {
            product: {
                _id: { type: String, require: true },
                name: { type: String },
                img: { type: String },
                unit: { type: Number },
                price: { type: Number },
            },
            unit: { type: Number, require: true },
        },
    ],
});
exports.default = mongoose_1.default.model("cart", CartSchema);
