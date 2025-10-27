import type { Request, Response } from "express";
import { catchAsync } from "../../utlis/catchAsync.js";
import AppError from "../../errorHelper/AppError.js";
import  httpStatus  from 'http-status-codes';
import { authService } from "./auth.service.js";
import { sendResponse } from "../../utlis/sendResponse.js";

// login user controller
const loginUserController = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email and password are required.");
  }

  const user = await authService.loginUserService({ email, password });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User login successful!",
    data: user,
  });
});

export const authController = {
  loginUserController,
};
