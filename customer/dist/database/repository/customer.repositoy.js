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
class CustomerRepository {
    CreateCustomer({ email, password, phone, salt }) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = new models_1.CustomerModel({
                email,
                password,
                salt,
                phone,
                address: [],
            });
            const customerResult = yield customer.save();
            return customerResult;
        });
    }
    CreateAddress(_id, { street, postalCode, city, country }) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield models_1.CustomerModel.findById(_id);
            if (profile) {
                const newAddress = new models_1.AddressModel({
                    street,
                    postalCode,
                    city,
                    country,
                });
                yield newAddress.save();
                profile.address.push(newAddress._id);
                return yield profile.save();
            }
        });
    }
    FindCustomer(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingCustomer = yield models_1.CustomerModel.findOne({ email: email });
            return existingCustomer;
        });
    }
    FindCustomerById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingCustomer = yield models_1.CustomerModel.findById(id).populate('address');
                return existingCustomer;
            }
            catch (err) {
                throw (err);
            }
        });
    }
    DeleteCustomerById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return models_1.CustomerModel.findByIdAndDelete(id);
        });
    }
}
exports.default = CustomerRepository;
