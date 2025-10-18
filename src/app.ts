import express, { type NextFunction, type Request, type Response } from "express";
import cors from "cors";
import { router } from "./app/routes/index.js";

const app = express();
app.use(cors());

app.use("/api/v1", router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    
})


export default app;
