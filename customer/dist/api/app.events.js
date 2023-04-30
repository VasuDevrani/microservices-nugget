"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customerService_1 = __importDefault(require("../services/customerService"));
exports.default = (app) => {
    const service = new customerService_1.default();
    app.use('/app-events', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { payload } = req.body;
        //handle subscribe events
        // service.SubscribeEvents(payload);
        console.log("============= Shopping ================");
        console.log(payload);
        res.json(payload);
    }));
};
