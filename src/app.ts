import express from "express";
import cors from "cors";
import { router } from "./app/routes/index.js";

const app = express();
app.use(cors());

app.use("/api/v1", router);


export default app;
