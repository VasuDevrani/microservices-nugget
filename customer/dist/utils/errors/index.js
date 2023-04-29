"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ((app) => {
    app.use(({ error, res }) => {
        const statusCode = error.statusCode || 500;
        const data = error.data || error.message;
        return res.status(statusCode).json(data);
    });
});
