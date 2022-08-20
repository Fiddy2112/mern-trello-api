import { CardModel } from "../models/card.model.js";

const createNew = async (data) => {
  try {
    const result = await CardModel.createNew(data);
    return result;
  } catch (e) {
    throw new Error(e);
  }
};

const update = async (id, data) => {
  try {
    const updateData = { ...data, updatedAt: Date.now() };
    const result = await CardModel.update(id, updateData);
    return result;
  } catch (e) {
    throw new Error(e);
  }
};

export const CardService = { createNew, update };
