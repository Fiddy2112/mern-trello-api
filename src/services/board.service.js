import { BoardModel } from "../models/board.model.js";

const createNew = async (data) => {
  try {
    const result = await BoardModel.createNew(data);
    return result;
  } catch (e) {
    throw new Error(e);
  }
};

export const BoardService = { createNew };