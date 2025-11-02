import type { NextFunction, Request, Response } from "express";
import AppError from "../errorHelper/AppError.js";
import jwt from "jsonwebtoken";

export const userJwtVerify =async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization
        if(!accessToken){
          throw new AppError(401, "You are not authorized to access this route")
        }
        
        const verifyToken =  jwt.verify(accessToken as string, process.env.JWT_TOKEN as string)

        if(!verifyToken){
            throw new AppError(403, "You are not authorized")
        }
    
       console.log(verifyToken);

        next();
    } catch (error) {
        if(error instanceof Error){
          throw new  AppError(403, `Invalid token: ${error.message}`)
        }
    }
}