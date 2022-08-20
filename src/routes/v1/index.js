import express from "express";
import { HttpStatusCode } from "../../utils/constants.js";
import { boardsRoutes } from "./board.route.js";

const router = express.Router();

// get v1/status
router.get("/status", (req, res) => {
  res.status(HttpStatusCode.OK).json({
    status: "success",
  });
});

// Board api
router.use("/boards", boardsRoutes);

export const apiV1 = router;
