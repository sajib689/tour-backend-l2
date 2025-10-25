import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserService } from "./user.service.js";
import { catchAsync } from "../../utlis/catchAsync.js";
import { sendResponse } from "../../utlis/sendResponse.js";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserService.createUserService(req.body);
    res.status(httpStatus.CREATED).json({
      message: "User Created Successfully",
      user,
    });
  } catch (error) {
    next(error)
  }
};

const getAllUsersController = catchAsync(async (req: Request, res: Response) => {
  const users = await UserService.getAllUsers()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Users Retrieved Successfully",
    data: users
  })
})



export const userController = {
  createUser,
  getAllUsersController
};
