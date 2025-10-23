import type { IUser } from "./user.interface.js";
import { User } from "./user.model.js";

const createUserService = async (payload: Partial<IUser>) => {
  const user = await User.create(payload);
  return user;
};
const getAllUsers = async () => {
  const users = await User.find()
  return users
}
export const UserService = {
  createUserService,
  getAllUsers
};

