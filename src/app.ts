import express from "express";
import userRouter from "./app/modules/user/user.route.js";

const app = express();

app.use("/api/v1", userRouter);

export default app;
