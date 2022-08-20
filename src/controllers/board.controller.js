import { BoardService } from "../services/board.service.js";
import { HttpStatusCode } from "../utils/constants.js";

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

export const BoardController = { createNew };
