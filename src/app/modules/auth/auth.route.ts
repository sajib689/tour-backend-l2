import express from "express";
import { authController } from "./auth.controller.js";
import { adminJwtVerify } from "./../../middleware/adminJwtVerify";
import { userJwtVerify } from "../../middleware/userJwtVerify.js";

const authRouter = express.Router();

authRouter.post("/login", authController.loginUserController);
authRouter.post("/refresh-token", authController.getNewAccessToken);
authRouter.post("/logout", authController.logoutController);
authRouter.post(
  "/reset-password",
  adminJwtVerify,
  userJwtVerify,
  authController.resetPasswordController
);

export default authRouter;
