import { NextFunction, Request, Response, Express } from "express";
import { ErrorInterface } from "../../types/error/error.types";

export default ((app: Express) => {
  app.use(({error, res}: {
    error: ErrorInterface,
    req: Request,
    res: Response,
    next: NextFunction
  }) => {
    const statusCode = error.statusCode || 500;
    const data = error.data || error.message;
    return res.status(statusCode).json(data);
  });
});
