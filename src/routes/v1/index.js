import express from "express";
import { HttpStatusCode } from "../../utils/constants.js";
import { boardsRoutes } from "./board.route.js";
import { columnsRoutes } from "./column.route.js";
import { cardRoutes } from "./card.route.js";

const router = express.Router();

// get v1/status
router.get("/status", (req, res) => {
  res.status(HttpStatusCode.OK).json({
    status: "success",
  });
});

// Board api
router.use("/boards", boardsRoutes);

// Column api
router.use("/columns", columnsRoutes);

// Card api
router.use("/cards", cardRoutes);

export const apiV1 = router;
