import Joi from "joi";
import { ObjectId } from "mongodb";
import { getDB } from "../config/mongodb.js";
import { ColumnModel } from "./column.model.js";

// Define Board Collection
const boardCollectionName = "boards";
const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(20).trim(),
  columnOrder: Joi.array().items(Joi.string()).default([]),
  createAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.date().default(false),
});

const validateSchema = async (data) => {
  return await boardCollectionSchema.validateAsync(data, { abortEarly: false });
};

const createNew = async (data) => {
  try {
    const value = await validateSchema(data);
    const result = await getDB()
      .collection(boardCollectionName)
      .insertOne(value);
    return result;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 *
 * @param {string} boardId
 * @param {string} columnId
 */

const pushColumnOrder = async (boardId, columnId) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(boardId) },
        { $push: { columnOrder: columnId } },
        { returnDocument: "after" }
      );

    return result.value;
  } catch (e) {
    throw new Error(e);
  }
};

const getFullBoard = async (boardId) => {
  try {
    console.log(ColumnModel.columnCollectionName);
    const result = await getDB()
      .collection(boardCollectionName)
      .aggregate([
        { $match: { _id: ObjectId(boardId) } },
        {
          from: ColumnModel.columnCollectionName, // collection name
          $lookup: {
            localField: "_id", // field in the input documents
            foreignField: "boardId", // field in the documents of the "from" collection
            as: "columns", // output array field
          },
        },
        {
          $lookup: {
            from: "cards", // collection name
            localField: "_id", // field in the input documents
            foreignField: "boardId", // field in the documents of the "from" collection
            as: "cards", // output array field
          },
        },
      ])
      .toArray();
    // return result;
    return result[0] || {};
  } catch (e) {
    throw new Error(e);
  }
};

export const BoardModel = { createNew, pushColumnOrder, getFullBoard };
