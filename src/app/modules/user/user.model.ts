import { model, Schema } from "mongoose";
import { IActive, Role, type IUser } from "./user.interface.js";

const userSchema = new Schema<IUser>({
   id: {
    type: String
   },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: Object.keys(Role),
    default: Role.USER,
  },
  auths: [
    {
      provider: {
        type: String,
        required: true,
      },
      providerId: {
        type: String,
      },
    },
  ],

  phone: {
    type: String,
  },
  picture: {
    type: String,
  },
  address: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
  },
  isActive: {
    type: String,
    enum: Object.keys(IActive),
    default: IActive.ACTIVE,
  },
  isVerified: {
    type: Boolean,
    default: false
  }
});

export const User = model<IUser>("User", userSchema);
