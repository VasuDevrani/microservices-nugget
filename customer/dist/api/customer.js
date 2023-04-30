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
const auth_1 = __importDefault(require("./middlewares/auth"));
const utils_1 = require("../utils");
const config_1 = __importDefault(require("../config"));
const { SHOPPING_SERVICE } = config_1.default;
exports.default = (app, channel) => {
    const service = new customerService_1.default();
    app.post("/signup", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password, phone } = req.body;
            const data = yield service.SignUp({ email, password, phone });
            return res.json(data);
        }
        catch (error) {
            next(error);
        }
    }));
    app.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const data = yield service.SignIn({ email, password });
            return res.json(data);
        }
        catch (error) {
            next(error);
        }
    }));
    app.post("/address", auth_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { _id } = req.user;
            const { street, postalCode, city, country } = req.body;
            const data = yield service.AddNewAddress(_id, {
                street,
                postalCode,
                city,
                country,
            });
            return res.json(data);
        }
        catch (error) {
            next(error);
        }
    }));
    app.get("/profile", auth_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { _id } = req.user;
            const data = yield service.GetProfile(_id);
            return res.json(data);
        }
        catch (error) {
            console.log("jjdkhkjd");
            next(error);
        }
    }));
    app.delete("/profile", auth_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { _id } = req.user;
            const { data, payload } = yield service.DeleteProfile(_id);
            // Send message to Shopping Service for removing cart & wishlist
            (0, utils_1.PublishMessage)(channel, SHOPPING_SERVICE, JSON.stringify(payload));
            return res.json(data);
        }
        catch (error) {
            next(error);
        }
    }));
    app.get("/whoami", (req, res) => {
        return res.status(200).json({ msg: "/customer : I am Customer Service" });
    });
};
