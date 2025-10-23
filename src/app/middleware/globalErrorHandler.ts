import type { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { envVars } from "../config/env.js";

export const globalErrorHandler: ErrorRequestHandler = (err, req:Request, res:Response, next:NextFunction) => {
    const statusCode = 500;
    const message = `Something went wrong ${err?.message}`;

    res.status(statusCode).json({
        success: false,
        message,
        err,
        stack: envVars.NODE_ENV === "development" ? err?.stack : null,
    });
    next()
};
