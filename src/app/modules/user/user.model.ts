import { model, Schema } from "mongoose";
import type { IUser } from "./user.interface.js";

const userSchema = new Schema({
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
    type: Boolean,
  },
});

export const User = model<IUser>("User", userSchema);
