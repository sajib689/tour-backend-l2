import type { Request, Response } from "express";
import { catchAsync } from "../../utlis/catchAsync.js";
import AppError from "../../errorHelper/AppError.js";
import httpStatus from "http-status-codes";
import { authService } from "./auth.service.js";
import { sendResponse } from "../../utlis/sendResponse.js";
import { setToken } from "../../utlis/setToken.js";
import { clearToken } from "../../utlis/clearToken.js";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../../utlis/genarateAccessToken.js";
import { envVars } from "../../config/env.js";

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
const logoutController = catchAsync(async (req: Request, res: Response) => {
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
});

// reset password

const resetPasswordController = catchAsync(
  async (req: Request, res: Response) => {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized ");
    }
    const decoded = verifyToken(accessToken, envVars.JWT_TOKEN) as JwtPayload;
    const email = decoded?.email;

    if (!email) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Invalid token payload!");
    }
    const { newPassword, oldPassword } = req.body;
    if (!accessToken) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized request!");
    }

    if (!oldPassword || !newPassword) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Both old and new passwords are required!"
      );
    }

    await authService.resetPasswordService(oldPassword, newPassword, email);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Password reset successfully!",
      data: null,
    });
  }
);

export const authController = {
  loginUserController,
  getNewAccessToken,
  logoutController,
  resetPasswordController,
};
