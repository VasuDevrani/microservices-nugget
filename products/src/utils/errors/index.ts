import { Request, Response, Express, NextFunction } from "express";
import { ErrorInterface } from "../../types/error/error.types";

export default ((app: Express) => {
  app.use((error: ErrorInterface, req: Request, res: Response, next: NextFunction) => {
    console.log("erorr")
    const statusCode = error.statusCode || 500;
    const data = error.data || error.message;
    return res.status(statusCode).json(data);
  });
});