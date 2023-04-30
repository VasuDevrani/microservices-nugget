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
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
//Dealing with data base operations
class ProductRepository {
    CreateProduct({ name, desc, type, unit, price, available, suplier, banner, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = new models_1.ProductModel({
                name,
                desc,
                type,
                unit,
                price,
                available,
                suplier,
                banner,
            });
            const productResult = yield product.save();
            return productResult;
        });
    }
    Products() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield models_1.ProductModel.find();
        });
    }
    FindById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield models_1.ProductModel.findById(id);
        });
    }
    FindByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield models_1.ProductModel.find({ type: category });
            return products;
        });
    }
    FindSelectedProducts(selectedIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield models_1.ProductModel.find()
                .where('_id')
                .in(selectedIds.map((_id) => _id))
                .exec();
            return products;
        });
    }
}
exports.default = ProductRepository;
