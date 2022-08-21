import { CardModel } from "../models/card.model.js";
import { ColumnModel } from "../models/column.model.js";

const createNew = async (data) => {
  try {
    const newCard = await CardModel.createNew(data);

    const getNewCard = await CardModel.findOneById(
      newCard.insertedId.toString()
    );

    // Update card array in column collection
    await ColumnModel.pushCardOrder(
      getNewCard.columnId.toString(),
      getNewCard._id.toString()
    );
    return newCard;
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
