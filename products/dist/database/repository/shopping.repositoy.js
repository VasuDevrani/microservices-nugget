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
const uuid_1 = require("uuid");
const lodash_1 = __importDefault(require("lodash"));
const models_1 = require("../models");
//Dealing with data base operations
class ShoppingRepository {
    // Cart
    Cart(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return models_1.CartModel.findOne({ customerId });
        });
    }
    ManageCart(product, { customerId, qty, isRemove }) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield models_1.CartModel.findOne({ customerId });
            if (cart) {
                if (isRemove) {
                    const cartItems = lodash_1.default.filter(cart.items, (item) => { var _a; return ((_a = item.product) === null || _a === void 0 ? void 0 : _a._id) !== product._id; });
                    cart.items = cartItems;
                    // handle remove case
                }
                else {
                    const cartIndex = lodash_1.default.findIndex(cart.items, {
                        product: { _id: product._id },
                    });
                    if (cartIndex > -1) {
                        cart.items[cartIndex].unit = qty;
                    }
                    else {
                        cart.items.push({ product: Object.assign({}, product), unit: qty });
                    }
                }
                return yield cart.save();
            }
            else {
                // create a new one
                return yield models_1.CartModel.create({
                    customerId,
                    items: [{ product: Object.assign({}, product), unit: qty }],
                });
            }
        });
    }
    ManageWishlist(customerId, product_id, isRemove = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const wishlist = yield models_1.WishlistModel.findOne({ customerId });
            if (wishlist) {
                if (isRemove) {
                    const produtcs = lodash_1.default.filter(wishlist.products, (product) => product._id !== product_id);
                    wishlist.products = produtcs;
                    // handle remove case
                }
                else {
                    const wishlistIndex = lodash_1.default.findIndex(wishlist.products, {
                        _id: product_id,
                    });
                    if (wishlistIndex < 0) {
                        wishlist.products.push({ _id: product_id });
                    }
                }
                return yield wishlist.save();
            }
            else {
                // create a new one
                return yield models_1.WishlistModel.create({
                    customerId,
                    wishlist: [{ _id: product_id }],
                });
            }
        });
    }
    GetWishlistByCustomerId(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return models_1.WishlistModel.findOne({ customerId });
        });
    }
    Orders(customerId, orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (orderId) {
                return models_1.OrderModel.findOne({ _id: orderId });
            }
            else {
                return models_1.OrderModel.find({ customerId });
            }
        });
    }
    CreateNewOrder(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield models_1.CartModel.findOne({ customerId: customerId });
            if (cart) {
                let amount = 0;
                const cartItems = cart.items;
                if (cartItems.length > 0) {
                    //process Order
                    cartItems.map((item) => {
                        var _a;
                        amount += (((_a = item.product) === null || _a === void 0 ? void 0 : _a.price) || 0) * (item.unit || 0);
                    });
                    const orderId = (0, uuid_1.v4)();
                    const order = new models_1.OrderModel({
                        orderId,
                        customerId,
                        amount,
                        status: 'received',
                        items: cartItems,
                    });
                    cart.items = [];
                    const orderResult = yield order.save();
                    yield cart.save();
                    return orderResult;
                }
            }
            return {};
        });
    }
    deleteProfileData(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all([
                models_1.CartModel.findOneAndDelete({ customerId }),
                models_1.WishlistModel.findOneAndDelete({ customerId }),
            ]);
        });
    }
}
exports.default = ShoppingRepository;
