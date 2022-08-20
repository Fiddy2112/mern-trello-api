import express from "express";
import { connectDB } from "./config/mongodb.js";
import { env } from "./config/environment.js";

import { apiV1 } from "./routes/v1/index.js";

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
  // request.body data
  app.use(express.json());

  // use api v1
  app.use("/v1", apiV1);

  app.listen(PORT, hostname, () => {
    console.log(`server started on port ${hostname}:${PORT}`);
  });
};
