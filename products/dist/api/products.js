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
const productService_1 = __importDefault(require("../services/productService"));
const utils_1 = require("../utils");
exports.default = (app, channel) => {
    const service = new productService_1.default();
    (0, utils_1.RPCObserver)("PRODUCT_RPC", service, channel);
    app.post("/product/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, desc, type, unit, price, available, suplier, banner } = req.body;
        // validation
        const { data } = yield service.CreateProduct({
            name,
            desc,
            type,
            unit,
            price,
            available,
            suplier,
            banner,
        });
        return res.json(data);
    }));
    app.get("/category/:type", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const type = req.params.type;
        try {
            const { data } = yield service.GetProductsByCategory(type);
            return res.status(200).json(data);
        }
        catch (error) {
            return res.status(404).json({ error });
        }
    }));
    app.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const productId = req.params.id;
        try {
            const { data } = yield service.GetProductDescription(productId);
            return res.status(200).json(data);
        }
        catch (error) {
            return res.status(404).json({ error });
        }
    }));
    app.post("/ids", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { ids } = req.body;
        const products = yield service.GetSelectedProducts(ids);
        return res.status(200).json(products);
    }));
    app.get("/whoami", (req, res) => {
        return res
            .status(200)
            .json({ msg: "/ or /products : I am products Service" });
    });
    //get Top products and category
    app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        //check validation
        try {
            const { data } = yield service.GetProducts();
            return res.status(200).json(data);
        }
        catch (error) {
            return res.status(404).json({ error });
        }
    }));
};
