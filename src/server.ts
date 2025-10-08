import { Server } from "http";
import mongoose from "mongoose";
import app from "./app.js";
import { envVars } from "./app/config/env.js";
let server: Server;

async function startServer() {
  try {
    await mongoose.connect(
      envVars.DB_URL
    );
    console.log("server connected");
    server = app.listen(envVars.PORT, () => {
      console.log("Server Is Listening....");
    });
  } catch (error) {
    console.log(error);
  }
}

process.on("SIGTERM", (err) => {
  console.log("SIGTERM  detected... Server shutting down...", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1)
});


process.on("SIGINT", (err) => {
  console.log("SIGINT  detected... Server shutting down...", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1)
});
startServer()