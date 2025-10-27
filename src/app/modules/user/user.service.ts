import type { IAuthProvider, IUser } from "./user.interface.js";
import { User } from "./user.model.js";

// create user service
const createUserService = async (payload: Partial<IUser>) => {
  const {email, ...rest} = payload

  const authProvider: IAuthProvider = {provider: "credentials", providerId: email as string}
  const user = await User.create({
    email,
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


// export services
export const UserService = {
  createUserService,
  getAllUsers,
  getSingleUser
};

