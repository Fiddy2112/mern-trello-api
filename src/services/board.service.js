import { BoardModel } from "../models/board.model.js";

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

    // Add card to each column
    board.columns.forEach((column) => {
      column.cards = board.cards.filter(
        (card) => card.columnId.toString() === column._id.toString()
      );
    });

    //remove cards from board
    delete board.cards;
    console.log("board", board);
    return board;
  } catch (e) {
    throw new Error(e);
  }
};

export const BoardService = { createNew, getFullBoard };
