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
exports.CreateServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("./api"));
const utils_1 = require("./utils");
const CreateServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    return app;
});
exports.CreateServer = CreateServer;
exports.default = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    // app.use(express.static(__dirname + '/public'));
    const channel = yield (0, utils_1.CreateChannel)();
    (0, api_1.default)(app, channel);
});
