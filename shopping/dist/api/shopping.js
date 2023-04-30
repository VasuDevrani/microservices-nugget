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
const shooppingService_1 = __importDefault(require("../services/shooppingService"));
const auth_1 = __importDefault(require("./middlewares/auth"));
const utils_1 = require("../utils");
exports.default = (app, channel) => {
    const service = new shooppingService_1.default();
    (0, utils_1.SubscribeMessage)(channel, service);
    // Cart
    app.post('/cart', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id } = req.user;
        console.log(_id, req.body);
        const { product_id, qty } = req.body;
        const { data } = yield service.AddCartItem(_id, product_id, qty);
        res.status(200).json(data);
    }));
    app.delete('/cart/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id } = req.user;
        const productId = req.params.id;
        const data = yield service.RemoveCartItem(_id, productId);
        res.status(200).json(data);
    }));
    app.get('/cart', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id } = req.user;
        const data = yield service.GetCart(_id);
        return res.status(200).json(data);
    }));
    // Wishlist
    app.post('/wishlist', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id } = req.user;
        const { product_id } = req.body;
        const data = yield service.AddToWishlist(_id, product_id);
        return res.status(200).json(data);
    }));
    app.get('/wishlist', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id } = req.user;
        const data = yield service.GetWishlist(_id);
        return res.status(200).json(data);
    }));
    app.delete('/wishlist/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id } = req.user;
        const product_id = req.params.id;
        const data = yield service.RemoveFromWishlist(_id, product_id);
        return res.status(200).json(data);
    }));
    // Orders
    app.post('/order', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id } = req.user;
        // const { txnNumber } = req.body;
        const data = yield service.CreateOrder(_id);
        return res.status(200).json(data);
    }));
    app.get('/order/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id } = req.user;
        const data = yield service.GetOrder(_id);
        return res.status(200).json(data);
    }));
    app.get('/orders', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id } = req.user;
        const data = yield service.GetOrders(_id);
        return res.status(200).json(data);
    }));
    app.get('/whoami', (req, res) => {
        return res.status(200).json({ msg: '/shoping : I am Shopping Service' });
    });
};
