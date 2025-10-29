

import AppError from "../../errorHelper/AppError.js"
import  httpStatus  from 'http-status-codes';
import { User } from "../user/user.model.js";
import bcrypt from "bcryptjs";
import type { IUser } from "../user/user.interface.js";
import { generatorAccessToken } from "../../utlis/genarateAccessToken.js";
// login user service
const loginUserService = async(payload: Partial<IUser>) => {
  const {email, password} = payload
  if(!email || !password){
    throw new AppError(
    httpStatus.BAD_REQUEST,
    "Please check user credentials"
    )
  }
  const user = await User.findOne({email}).select("+password").lean();

  if(!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User not found")
  }
 
  const isMatchPassword = await bcrypt.compare(password, user?.password as string)
  if(!isMatchPassword){
    throw new AppError(httpStatus.UNAUTHORIZED, "invalid email or password")
  }
  const jwtPayload = {
    email: user.email,
    role: user.role,
    userId: user._id
  }
  const secretToken = process.env.JWT_TOKEN
  const accessToken = generatorAccessToken(jwtPayload,secretToken as string,"7d")
  //  const accessToken = jwt.sign(jwtPayload, process.env.JWT_TOKEN as string,{
  //   expiresIn: "7day"
  //  })
  return {
    accessToken,
    user
  }

}


export const authService ={
    loginUserService
}