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
const utils_1 = require("../../utils");
const app_errors_1 = require("../../utils/errors/app-errors");
const userAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isAuthorized = yield (0, utils_1.ValidateSignature)(req);
        if (isAuthorized) {
            return next();
        }
        throw new app_errors_1.AuthorizeError("not authorised to access resources");
    }
    catch (error) {
        next(error);
    }
});
exports.default = userAuth;
