import { CardService } from "../services/card.service.js";
import { HttpStatusCode } from "../utils/constants.js";

const createNew = async (req, res) => {
  try {
    const result = await CardService.createNew(req.body);
    res.status(HttpStatusCode.OK).json(result);
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: e.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await CardService.update(id, req.body);
    res.status(HttpStatusCode.OK).json(result);
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: e.message });
  }
};

export const CardController = { createNew, update };
