import type { Request, Response } from "express";
import httpStatus from "http-status-codes"

export const notFoundErrorHandler = (req: Request, res: Response) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'Route Not Found'
    })
}