"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sentry = __importStar(require("@sentry/node"));
const app_errors_1 = require("./app-errors");
const config_1 = __importDefault(require("../../config"));
const { SENTRY } = config_1.default;
Sentry.init({
    dsn: SENTRY,
    tracesSampleRate: 1.0,
});
exports.default = ((app) => {
    app.use((error, req, res, next) => {
        let reportError = true;
        // skip common / known errors
        [app_errors_1.NotFoundError, app_errors_1.ValidationError, app_errors_1.AuthorizeError].forEach((typeOfError) => {
            if (error instanceof typeOfError) {
                reportError = false;
            }
        });
        if (reportError) {
            Sentry.captureException(error);
        }
        const statusCode = error.statusCode || 500;
        const data = error.data || error.message;
        return res.status(statusCode).json(data);
    });
});
