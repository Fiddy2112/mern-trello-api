import express from "express";
import { connectDB } from "./config/mongodb.js";
import { env } from "./config/environment.js";
import { BoardModel } from "./models/board.model.js";

connectDB()
  .then(() => {
    console.log("Connected successfully to server!");
  })
  .then(() => {
    bootServer();
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });

const bootServer = () => {
  const app = express();
  const hostname = env.APP_HOST;

  const PORT = env.APP_PORT || 5000;

  app.get("/test", async (req, res) => {
    res.send("hello world");
  });

  app.listen(PORT, hostname, () => {
    console.log(`server started on port ${hostname}:${PORT}`);
  });
};
