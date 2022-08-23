import { BoardService } from "../services/board.service.js";
import { HttpStatusCode } from "../utils/constants.js";
import Joi from "joi";

const createNew = async (req, res) => {
  try {
    const result = await BoardService.createNew(req.body);
    res.status(HttpStatusCode.OK).json(result);
  } catch (e) {
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ errors: e.message });
  }
};

const getFullBoard = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await BoardService.getFullBoard(id);
    console.log(result);
    res.status(HttpStatusCode.OK).json(result);
  } catch (e) {
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ errors: e.message });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await BoardService.update(id, req.body);

    res.status(HttpStatusCode.OK).json(result);
  } catch (e) {
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ errors: e.message });
  }
};

export const BoardController = { createNew, getFullBoard, update };
