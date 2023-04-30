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
const shopping_repositoy_1 = __importDefault(require("../database/repository/shopping.repositoy"));
const utils_1 = require("../utils");
// All Business logic will be here
class ProductService {
    constructor() {
        this.repository = new shopping_repositoy_1.default();
    }
    CreateProduct(productInputs) {
        return __awaiter(this, void 0, void 0, function* () {
            const productResult = yield this.repository.CreateProduct(productInputs);
            return (0, utils_1.FormateData)(productResult);
        });
    }
    GetProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.repository.Products();
            return (0, utils_1.FormateData)({
                products,
                categories: Object.keys(products.map(({ type }) => type)),
            });
        });
    }
    GetProductDescription(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.repository.FindById(productId);
            return (0, utils_1.FormateData)(product);
        });
    }
    GetProductsByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.repository.FindByCategory(category);
            return (0, utils_1.FormateData)(products);
        });
    }
    GetSelectedProducts(selectedIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.repository.FindSelectedProducts(selectedIds);
            return (0, utils_1.FormateData)(products);
        });
    }
    GetProductPayload(userId, { productId, qty }, event) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.repository.FindById(productId);
            if (product) {
                const payload = {
                    event: event,
                    data: { userId, product, qty },
                };
                return (0, utils_1.FormateData)(payload);
            }
            else {
                return (0, utils_1.FormateData)({ error: 'No product Available' });
            }
        });
    }
    // RPC Response
    serveRPCRequest(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type, data } = payload;
            switch (type) {
                case "VIEW_PRODUCT":
                    return this.repository.FindById(data);
                    break;
                case "VIEW_PRODUCTS":
                    return this.repository.FindSelectedProducts(data);
                default:
                    break;
            }
        });
    }
}
exports.default = ProductService;
