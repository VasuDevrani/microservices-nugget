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
// All Business logic will be here
class ShoppingService {
    constructor() {
        this.repository = new shopping_repositoy_1.default();
    }
    // Cart Info
    AddCartItem(customerId, product_id, qty) {
        return __awaiter(this, void 0, void 0, function* () {
            // Grab product info from product Service through RPC
            // const productResponse = await RPCRequest("PRODUCT_RPC", {
            //   type: "VIEW_PRODUCT",
            //   data: product_id,
            // });
            // if (productResponse && productResponse._id) {
            //   const data = await this.repository.ManageCart(
            //     customerId,
            //     productResponse,
            //     qty
            //   );
            const data = {
                name: "hekdj"
            };
            return { data };
            // }
            // throw new Error("Product data not found!");
        });
    }
    RemoveCartItem(customerId, product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.ManageCart({ _id: product_id }, {
                customerId,
                qty: 0,
                isRemove: true,
            });
        });
    }
    GetCart(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.Cart(_id);
        });
    }
    // Wishlist
    AddToWishlist(customerId, product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.ManageWishlist(customerId, product_id);
        });
    }
    RemoveFromWishlist(customerId, product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.ManageWishlist(customerId, product_id, true);
        });
    }
    GetWishlist(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const wishlist = yield this.repository.GetWishlistByCustomerId(customerId);
            if (!wishlist) {
                return {};
            }
            // const { products } = wishlist;
            // if (Array.isArray(products)) {
            //   const ids = products.map(({ _id }) => _id);
            //   // Perform RPC call
            //   const productResponse = true
            //   // await RPCRequest('PRODUCT_RPC', {
            //   //   type: 'VIEW_PRODUCTS',
            //   //   data: ids,
            //   // });
            //   if (productResponse) {
            //     return productResponse;
            //   }
            // }
            return wishlist;
        });
    }
    // Orders
    CreateOrder(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.CreateNewOrder(customerId);
        });
    }
    GetOrder(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.Orders('', orderId);
        });
    }
    GetOrders(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.Orders(customerId, "");
        });
    }
    // async ManageCart(item: ProductInterface, {customerId, qty, isRemove}: CartInterface) {
    //   const cartResult = await this.AddCartItem(
    //     customerId,
    //     item,
    //     qty,
    //     isRemove,
    //   );
    //   return FormateData(cartResult);
    // }
    // async SubscribeEvents(payload) {
    //   payload = JSON.parse(payload);
    //   const { event, data } = payload;
    //   const { userId, product, qty } = data;
    //   switch (event) {
    //     case 'ADD_TO_CART':
    //       this.ManageCart(userId, product, qty, false);
    //       break;
    //     case 'REMOVE_FROM_CART':
    //       this.ManageCart(userId, product, qty, true);
    //       break;
    //     default:
    //       break;
    //   }
    // }
    deleteProfileData(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.deleteProfileData(customerId);
        });
    }
}
exports.default = ShoppingService;
