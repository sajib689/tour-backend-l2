import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserService } from "./user.service.js";
import { catchAsync } from "../../utlis/catchAsync.js";
import { sendResponse } from "../../utlis/sendResponse.js";
import { User } from "./user.model.js";
import AppError from "../../errorHelper/AppError.js";
import { verifyToken } from "../../utlis/genarateAccessToken.js";
import { JwtPayload } from "jsonwebtoken";

// create user controller and validate email
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    // Check if email exists
    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(httpStatus.BAD_REQUEST).json({
          success: false,
          message: `This email ${email} already exists in our database.`,
        });
      }
    }
    const user = await UserService.createUserService(req.body);
    res.status(httpStatus.CREATED).json({
      message: "User Created Successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

// get all users controller
const getAllUsersController = catchAsync(
  async (req: Request, res: Response) => {
    const users = await UserService.getAllUsers();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All Users Retrieved Successfully",
      data: users,
    });
  }
);

// get single user controller
const getSingleController = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError(httpStatus.BAD_REQUEST, "User ID is required");
  }
  const user = await UserService.getSingleUser(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single user retrieved successfully",
    data: user,
  });
});

// update user controller
const updateUserController = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  const accessToken = req.headers.authorization;
  if (!id) {
    throw new AppError(400, "User ID is required in URL params.");
  }

  if (!accessToken) throw new AppError(401, "Unauthorized");

  const jwtSecret = process.env.JWT_TOKEN;
  if (!jwtSecret) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "JWT_TOKEN is not configured on the server!!!!!."
    );
  }
  const secretToken = process.env.JWT_TOKEN;
  const verify = verifyToken(accessToken, secretToken as string) as JwtPayload;
  const user = await UserService.updateUserService(id, updateData, verify);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile updated successfully!",
    data: user,
  });
});

export const userController = {
  createUser,
  getAllUsersController,
  getSingleController,
  updateUserController,
};
