import express from "express";
import { mapOrder } from "./utils/sorts.js";

const app = express();

const hostname = "localhost";

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, hostname, () => {
  console.log(`server started on port ${hostname}:${PORT}`);
});
