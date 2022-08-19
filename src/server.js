import express from "express";
import { connectDB } from "./config/mongodb.js";
import { env } from "./config/environment.js";

const app = express();

const hostname = env.HOST_NAME;

const PORT = env.PORT || 5000;

connectDB();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, hostname, () => {
  console.log(`server started on port ${hostname}:${PORT}`);
});
