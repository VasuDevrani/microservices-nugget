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
const customer_repositoy_1 = __importDefault(require("../database/repository/customer.repositoy"));
const utils_1 = require("../utils");
const app_errors_1 = require("../utils/errors/app-errors");
// All Business logic will be here
class CustomerService {
    constructor() {
        this.repository = new customer_repositoy_1.default();
    }
    SignIn(userInputs) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password: inputPasswd } = userInputs;
            const existingCustomer = yield this.repository.FindCustomer(email);
            if (!existingCustomer)
                throw new app_errors_1.NotFoundError('user not found with provided email id!');
            const { password, salt } = existingCustomer;
            // console.log(existingCustomer)
            const validPassword = yield (0, utils_1.ValidatePassword)({
                inputPasswd,
                password,
                salt,
            });
            if (!validPassword)
                throw new app_errors_1.ValidationError('password does not match!');
            const token = yield (0, utils_1.GenerateSignature)({
                email: existingCustomer.email,
                _id: existingCustomer._id,
            });
            return { id: existingCustomer._id, token };
        });
    }
    SignUp(userInputs) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, phone } = userInputs;
            // create salt
            const salt = yield (0, utils_1.GenerateSalt)();
            const userPassword = yield (0, utils_1.GeneratePassword)(password, salt);
            const existingCustomer = yield this.repository.CreateCustomer({
                email,
                password: userPassword,
                phone,
                salt,
            });
            const token = yield (0, utils_1.GenerateSignature)({
                email: email,
                _id: existingCustomer._id,
            });
            return { id: existingCustomer._id, token };
        });
    }
    AddNewAddress(_id, userInputs) {
        return __awaiter(this, void 0, void 0, function* () {
            const { street, postalCode, city, country } = userInputs;
            return this.repository.CreateAddress(_id, {
                street,
                postalCode,
                city,
                country,
            });
        });
    }
    GetProfile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.FindCustomerById(id);
        });
    }
    DeleteProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.repository.DeleteCustomerById(userId);
            const payload = {
                event: 'DELETE_PROFILE',
                data: { userId },
            };
            return { data, payload };
        });
    }
}
exports.default = CustomerService;
