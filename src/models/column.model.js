import Joi from "joi";
import { ObjectId } from "mongodb";
import { getDB } from "../config/mongodb.js";
import lodash from "lodash";

const { cloneDeep } = lodash;

// Define Column Collection
const columnCollectionName = "columns";
const columnCollectionSchema = Joi.object({
  boardId: Joi.string().required(), // also Objectid when create new
  title: Joi.string().required().min(3).max(20).trim(),
  cardOrder: Joi.array().items(Joi.string()).default([]),
  createAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await columnCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};

const findOneById = async (id) => {
  try {
    const result = await getDB()
      .collection(columnCollectionName)
      .findOne({ _id: ObjectId(id) });
    return result;
  } catch (e) {
    throw new Error(e);
  }
};

const createNew = async (data) => {
  try {
    const validateValue = await validateSchema(data);
    const insertValue = {
      ...validateValue,
      boardId: ObjectId(validateValue.boardId),
    };
    const result = await getDB()
      .collection(columnCollectionName)
      .insertOne(insertValue);
    return result;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 *
 * @param {string} columnId
 * @param {string} cardId
 * @returns
 */

const pushCardOrder = async (columnId, cardId) => {
  try {
    const result = await getDB()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(columnId) },
        { $push: { cardOrder: cardId } },
        { returnDocument: "after" }
      );
    return result;
  } catch (e) {
    throw new Error(e);
  }
};

const update = async (id, data) => {
  try {
    const updateData = { ...data };
    if (data.boardId) updateData.boardId = ObjectId(data.boardId);

    const result = await getDB()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: updateData },
        { returnDocument: "after" }
      );

    return result.value;
  } catch (e) {
    throw new Error(e);
  }
};

export const ColumnModel = {
  columnCollectionName,
  createNew,
  update,
  findOneById,
  pushCardOrder,
};
