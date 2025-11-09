import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utlis/catchAsync.js";
import AppError from "../../errorHelper/AppError.js";
import httpStatus from "http-status-codes";
import { authService } from "./auth.service.js";
import { sendResponse } from "../../utlis/sendResponse.js";
import { setToken } from "../../utlis/setToken.js";
import { clearToken } from "../../utlis/clearToken.js";

// login user controller
const loginUserController = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Email and password are required."
    );
  }

  const user = await authService.loginUserService({ email, password });
  // res.cookie("refreshToken", user.refreshToken, {
  //   httpOnly: true,
  //   secure: false,
  // });
  setToken(res, user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User login successful!",
    data: user,
  });
});

// create new access token using by refresh token
const getNewAccessToken = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.authorization;

  const tokenInfo = await authService.createRefreshUserService(
    refreshToken as string
  );
  setToken(res, tokenInfo);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "New token creation successful!",
    data: tokenInfo,
  });
});

// logout controller
const logoutController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    clearToken(res, {
      accessToken: "accessToken",
      refreshToken: "refreshToken",
    });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Logout successfully!",
      data: null,
    });
    next();
  }
);
export const authController = {
  loginUserController,
  getNewAccessToken,
  logoutController,
};
