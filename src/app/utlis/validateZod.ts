import type { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";

export const validateZodSchema = (zodSchema: ZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await zodSchema.parseAsync(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
