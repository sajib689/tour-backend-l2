import type { IUser } from "./user.interface.js";
import { User } from "./user.model.js";

// create user service
const createUserService = async (payload: Partial<IUser>) => {
  const user = await User.create(payload);
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

