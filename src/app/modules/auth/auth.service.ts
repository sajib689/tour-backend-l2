import AppError from "../../errorHelper/AppError.js";
import httpStatus from "http-status-codes";
import { User } from "../user/user.model.js";
import bcrypt from "bcryptjs";
import { IActive, type IUser } from "../user/user.interface.js";
import { createToken } from "../../utlis/createToken.js";
import {
  generatorAccessToken,
  verifyToken,
} from "../../utlis/genarateAccessToken.js";
import { envVars } from "../../config/env.js";
import { JwtPayload } from "jsonwebtoken";

// login user service
const loginUserService = async (payload: Partial<IUser>) => {
  const { email, password } = payload;
  if (!email || !password) {
    throw new AppError(httpStatus.BAD_REQUEST, "Please check user credentials");
  }
  const user = await User.findOne({ email }).select("+password").lean();

  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User not found");
  }

  const isMatchPassword = await bcrypt.compare(
    password,
    user?.password as string
  );
  if (!isMatchPassword) {
    throw new AppError(httpStatus.UNAUTHORIZED, "invalid email or password");
  }
  const userTokens = await createToken(user);
  delete user.password;
  return {
    accessToken: userTokens.accessToken,
    refreshToken: userTokens.refreshToken,
    user,
  };
};

// refresh token get and set new token service
const createRefreshUserService = async (refreshToken: string) => {
  const verifyRefreshToken = verifyToken(
    refreshToken,
    envVars.JWT_REFRESH_TOKEN
  ) as JwtPayload;

  if (!verifyRefreshToken) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Refresh token not found");
  }
  const isUserExist = await User.findOne({
    email: verifyRefreshToken.email,
  });
  if (
    isUserExist?.isActive === IActive.BLOCKED ||
    isUserExist?.isActive === IActive.INACTIVE
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `User is ${isUserExist.isActive}`
    );
  }
  const jwtPayload = {
    email: isUserExist?.email,
    role: isUserExist?.role,
  };
  const accessToken = generatorAccessToken(jwtPayload, envVars.JWT_TOKEN, "7d");
  return {
    accessToken,
  };
};

// reset password service

const resetPasswordService = async (
  newPassword: string,
  oldPassword: string,
  email: string
) => {
  const user = await User.findOne({ email: email });
  if (!user || !user.password) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not found!");
  }
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "Old password is incorrect!");
  }
  const hashPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashPassword;
  await user.save();
};

export const authService = {
  loginUserService,
  createRefreshUserService,
  resetPasswordService,
};
