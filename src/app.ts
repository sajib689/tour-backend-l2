import express from "express";
import cors from "cors";
import { router } from "./app/routes/index.js";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler.js";
import { notFoundErrorHandler } from "./app/middleware/notFoundErrorHandler.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", router);

app.use(globalErrorHandler);
app.use(notFoundErrorHandler);

export default app;
