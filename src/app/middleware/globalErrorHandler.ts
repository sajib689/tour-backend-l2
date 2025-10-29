import type { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { envVars } from "../config/env.js";
import AppError from "../errorHelper/AppError.js";

export const globalErrorHandler: ErrorRequestHandler = (err, req:Request, res:Response, next:NextFunction) => {
    let statusCode = 500;
    let message = `Something went wrong`

    if(err instanceof AppError) {
        statusCode = err.statusCode
        message = err.message
    } else if(err instanceof Error){
        statusCode = 500
        message = err.message
    }

    
    res.status(statusCode).json({
        success: false,
        message,
        err,
        stack: envVars.NODE_ENV === "development" ? err?.stack : null,
    });
    next()
};
