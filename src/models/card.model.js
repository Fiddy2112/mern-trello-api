import Joi from "joi";
import { getDB } from "../config/mongodb.js";
import { ObjectId } from "mongodb";

// Define Card Collection
const cardCollectionName = "cards";
const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(), // also Objectid when create new
  columnId: Joi.string().required(), // also Objectid when create new
  title: Joi.string().required().min(3).max(20).trim(),
  cover: Joi.string().default(null),
  createAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  createAt: Joi.date().default(false),
});

const validateSchema = async (data) => {
  return await cardCollectionSchema.validateAsync(data, { abortEarly: false });
};

const createNew = async (data) => {
  try {
    const validateValue = await validateSchema(data);
    const insertValue = {
      ...validateValue,
      boardId: ObjectId(validateValue.boardId),
      columnId: ObjectId(validateValue.columnId),
    };
    const result = await getDB()
      .collection(cardCollectionName)
      .insertOne(insertValue);
    console.log(result);
    return result;
  } catch (e) {
    throw new Error(e);
  }
};

const findOneById = async (id) => {
  try {
    const result = await getDB()
      .collection(cardCollectionName)
      .findOne({ _id: ObjectId(id) });
    return result;
  } catch (e) {
    throw new Error(e);
  }
};

export const CardModel = {
  createNew,
  findOneById,
};
