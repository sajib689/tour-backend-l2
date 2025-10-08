import { Server } from "http";
import express from "express";
import mongoose from "mongoose";
const app = express();
const port = 5000;
let server: Server;

async function startServer() {
  try {
    await mongoose.connect(
      "mongodb+srv://tour-package:tour-package@sajib.chgzwan.mongodb.net/tour-package"
    );

    server = app.listen(port, () => {
      console.log("Server Is Listening....");
    });
  } catch (error) {
    console.log(error);
  }
}
