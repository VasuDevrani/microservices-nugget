"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CustomerSchema = new mongoose_1.default.Schema({
    email: String,
    password: String,
    salt: String,
    phone: String,
    address: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "address", require: true }],
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
        },
    },
    timestamps: true,
});
exports.default = mongoose_1.default.model("customer", CustomerSchema);
