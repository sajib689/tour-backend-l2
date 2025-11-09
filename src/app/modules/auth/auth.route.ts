import express from "express";
import { authController } from "./auth.controller.js";

const authRouter = express.Router();

authRouter.post("/login", authController.loginUserController);
authRouter.post("/refresh-token", authController.getNewAccessToken);
authRouter.post("/logout", authController.logoutController);

export default authRouter;
