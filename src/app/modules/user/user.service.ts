import AppError from "../../errorHelper/AppError.js";
import type { IAuthProvider, IUser } from "./user.interface.js";
import { User } from "./user.model.js";
import bcrypt from "bcryptjs";
import  httpStatus  from 'http-status-codes';

// create user service
const createUserService = async (payload: Partial<IUser>) => {
  const {email,password, ...rest} = payload
  const hashPassword = await bcrypt.hash(password as string,10)
  console.log(hashPassword);
  const authProvider: IAuthProvider = {provider: "credentials", providerId: email as string}
  const user = await User.create({
    email,
    password: hashPassword,
    auths: [authProvider],
    ...rest
  });
  return user;
};

// get all user service
const getAllUsers = async () => {
  const users = await User.find()
  return users
}

// get single user service
const getSingleUser = async (id: string) => {
  const user = await User.findById(id)
  return user
}

// login user controller

const loginUserController = async(payload: Partial<IUser>) => {
  const {email, password} = payload
  if(!email || !password){
    throw new AppError(
    httpStatus.BAD_REQUEST,
    "Please check user credentials"
    )
  }
  const user = await User.findOne({email}).select("+password")

  if(!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User unauthorized")
  }

  const isMatchPassword = await bcrypt.compare(password, user?.password as string)
  if(!isMatchPassword){
    throw new AppError(httpStatus.UNAUTHORIZED, "invalid email or password")
  }

  return user

}

// update user service

export const updateUserService = async (id: string, updateData: Partial<IUser>) => {
  if (!id) {
    throw new AppError(httpStatus.BAD_REQUEST, "User ID is required.");
  }

  const updatedUser = await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
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
  loginUserController,
  updateUserService
};

