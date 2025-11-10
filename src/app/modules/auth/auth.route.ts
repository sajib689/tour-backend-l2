import express from "express";
import { authController } from "./auth.controller.js";
import { adminJwtVerify } from "./../../middleware/adminJwtVerify";
import { userJwtVerify } from "../../middleware/userJwtVerify.js";
import passport from "passport";

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
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  authController.googleCallbackController
);
export default authRouter;
