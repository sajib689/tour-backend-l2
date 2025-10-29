import { Router } from "express";
import userRouter from "../modules/user/user.route.js";
import authRouter from "../modules/auth/auth.route.js";

export const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/auth",
    route: authRouter
  }
];

//  Use a different variable name
moduleRoutes.forEach((r) => {
  router.use(r.path, r.route);
});
