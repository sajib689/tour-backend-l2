import express from "express";
import { userController } from "./user.controller.js";
import { validateZodSchema } from "../../utlis/validateZod.js";
import { userZod } from "./user.zod.js";
import { adminJwtVerify } from "../../middleware/adminJwtVerify.js";
import { userJwtVerify } from "../../middleware/userJwtVerify.js";

const userRouter = express.Router();
// user routes
userRouter.post(
  "/register",
  validateZodSchema(userZod),
  userController.createUser
);
userRouter.get(
  "/all-users",
  adminJwtVerify,
  userController.getAllUsersController
);
userRouter.get(
  "/single-user/:id",
  userJwtVerify,
  adminJwtVerify,
  userController.getSingleController
);
userRouter.put(
  "/update/:id",
  adminJwtVerify,
  userController.updateUserController
);

export default userRouter;
