import { Router } from "express";
import userRouter from "../modules/user/user.route.js";

export const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRouter,
  },
];

// ✅ Use a different variable name
moduleRoutes.forEach((r) => {
  router.use(r.path, r.route);
});
