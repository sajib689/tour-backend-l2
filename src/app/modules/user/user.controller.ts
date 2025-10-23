import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserService } from "./user.service.js";

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

const getAllUsersController = async (res: Response, req: Request, next: NextFunction) => {
  try{
      const users = await UserService.getAllUsers()
      res.status(200).json({
        message: 'Users Get Successfully!',
        data: users
      })
  } catch(error){
    next(error)
  }
}



export const userController = {
  createUser,
  getAllUsersController
};
