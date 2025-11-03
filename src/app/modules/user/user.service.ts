import type { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelper/AppError.js";
import { Role, type IAuthProvider, type IUser } from "./user.interface.js";
import { User } from "./user.model.js";
import bcrypt from "bcryptjs";
import httpStatus from "http-status-codes";

// create user service
const createUserService = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;
  const hashPassword = await bcrypt.hash(password as string, 10);
  console.log(hashPassword);
  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };
  const user = await User.create({
    email,
    password: hashPassword,
    auths: [authProvider],
    ...rest,
  });
  return user;
};

// get all user service
const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

// get single user service
const getSingleUser = async (id: string) => {
  const user = await User.findById(id);
  return user;
};

// update user service

export const updateUserService = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  if (!userId) {
    throw new AppError(httpStatus.BAD_REQUEST, "User ID is required.");
  }
  const isUserExit = await User.findById(userId);

  if (!isUserExit) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found!");
  }

  if (payload.role) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }
    if (decodedToken.role === Role.ADMIN && payload.role === Role.SUPER_ADMIN) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }
  }

  if (payload.isActive || payload.isDeleted || payload.isVerified) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }
  }

  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, 10);
  }

  const updatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
  });

  if (!updatedUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  return updatedUser;
};

// export services
export const UserService = {
  createUserService,
  getAllUsers,
  getSingleUser,
  updateUserService,
};
