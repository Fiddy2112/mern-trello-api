import Joi from "joi";
import { getDB } from "../config/mongodb.js";
import { ObjectId } from "mongodb";
import lodash from "lodash";

const { cloneDeep } = lodash;

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

const update = async (id, data) => {
  try {
    // const updatedData = cloneDeep(data);
    const updatedData = { ...data };
    if (data.boardId) updatedData.boardId = ObjectId(data.boardId);
    if (data.columnId) updatedData.columnId = ObjectId(data.columnId);
    const result = await getDB()
      .collection(cardCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: updatedData },
        { returnDocument: "after" }
      );
    return result;
  } catch (e) {
    throw new Error(e);
  }
};

/*
 * @param {Array of string card id} ids
 */
const deleteCards = async (ids) => {
  try {
    const transformIds = ids.map((id) => ObjectId(id));
    const result = await getDB()
      .collection(cardCollectionName)
      .updateMany({ _id: { $in: transformIds } }, { $set: { _destroy: true } });
    return result;
  } catch (e) {
    throw new Error(e);
  }
};

export const CardModel = {
  cardCollectionName,
  createNew,
  findOneById,
  deleteCards,
  update,
};
