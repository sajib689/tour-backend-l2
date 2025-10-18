import type { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserService } from "./user.service.js";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.createUserService(req.body);
    res.status(httpStatus.CREATED).json({
      message: "User Created Successfully",
      user,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(httpStatus.BAD_REQUEST).json({
        message: `Something Went Wrong ${error.message}`,
      });
    }
  }
};

export const userController = {
  createUser,
};
