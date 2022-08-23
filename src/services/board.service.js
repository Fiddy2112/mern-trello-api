import { BoardModel } from "../models/board.model.js";
import lodash from "lodash";

const { cloneDeep } = lodash;

const createNew = async (data) => {
  try {
    const result = await BoardModel.createNew(data);
    return result;
  } catch (e) {
    throw new Error(e);
  }
};

const getFullBoard = async (boardId) => {
  try {
    const board = await BoardModel.getFullBoard(boardId);
    /*
        // Sort column bt columnOrder, sort cards by cardOrder,
        //but i think this step will pass to frontend dev to ease the burden on the server :v
    */
    if (!board || !board.columns) {
      throw new Error("Board not found!");
    }

    const transformBoard = cloneDeep(board);
    //filter deleted column
    transformBoard.columns = transformBoard.columns.filter(
      (column) => !column._destroy
    );

    // Add card to each column
    transformBoard.columns.forEach((column) => {
      column.cards = transformBoard.cards.filter(
        (card) => card.columnId.toString() === column._id.toString()
      );
    });
    console.log(board);

    //remove cards from board
    delete transformBoard.cards;
    return transformBoard;
  } catch (e) {
    throw new Error(e);
  }
};
const update = async (id, data) => {
  try {
    const updateData = { ...data, updatedAt: Date.now() };

    if (updateData._id) delete updateData._id;
    if (updateData.columns) delete updateData.columns;

    const updatedBoard = await BoardModel.update(id, updateData);

    return updatedBoard;
  } catch (e) {
    throw new Error(e);
  }
};

export const BoardService = { createNew, getFullBoard, update };
