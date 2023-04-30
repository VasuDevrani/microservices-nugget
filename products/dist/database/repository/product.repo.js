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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ProductRepository {
    CreateProduct({ name, desc, type, unit, price, available, suplier: supplier, banner, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield prisma.product.create({
                data: {
                    name,
                    desc,
                    type,
                    unit,
                    price,
                    available,
                    supplier,
                    banner,
                },
            });
            return product;
        });
    }
    Products() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.product.findMany();
        });
    }
    FindById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.product.findUnique({
                where: {
                    id,
                },
            });
        });
    }
    FindByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield prisma.product.findMany({
                where: {
                    type: category,
                },
            });
            return products;
        });
    }
    FindSelectedProducts(selectedIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield prisma.product.findMany({
                where: {
                    id: {
                        in: selectedIds,
                    },
                },
            });
            console.log(products);
        });
    }
}
exports.default = ProductRepository;
