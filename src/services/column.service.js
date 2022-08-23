import { BoardModel } from "../models/board.model.js";
import { ColumnModel } from "../models/column.model.js";
import { CardModel } from "../models/card.model.js";

const createNew = async (data) => {
  try {
    const newColumn = await ColumnModel.createNew(data);

    const getNewColumn = await ColumnModel.findOneById(
      newColumn.insertedId.toString()
    );
    getNewColumn.cards = [];

    // Update column array in board collection
    await BoardModel.pushColumnOrder(
      getNewColumn.boardId.toString(),
      getNewColumn._id.toString()
    );

    return getNewColumn;
  } catch (e) {
    throw new Error(e);
  }
};

const update = async (id, data) => {
  try {
    const updateData = { ...data, updatedAt: Date.now() };

    if (updateData._id) delete updateData._id;
    if (updateData.cards) delete updateData.cards;

    const updatedColumn = await ColumnModel.update(id, updateData);
    if (updatedColumn._destroy) {
      // delete many cards in this column
      CardModel.deleteCards(updatedColumn.cardOrder);
    }
    return updatedColumn;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const ColumnService = { createNew, update };
