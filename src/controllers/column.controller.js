import { ColumnService } from "../services/column.service.js";
import { HttpStatusCode } from "../utils/constants.js";

const createNew = async (req, res) => {
  try {
    const result = await ColumnService.createNew(req.body);
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
    const result = await ColumnService.update(id, req.body);

    res.status(HttpStatusCode.OK).json(result);
  } catch (e) {
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ errors: e.message });
  }
};

export const ColumnController = { createNew, update };
