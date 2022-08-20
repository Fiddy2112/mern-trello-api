import express from "express";
import { BoardController } from "../../controllers/board.controller.js";
import { BoardValidation } from "../../validations/board.validation.js";

const router = express.Router();

router
  .route("/")
  //   .get((req, res) => console.log("Get boards"))
  .post(BoardValidation.createNew, BoardController.createNew);

export const boardsRoutes = router;
