import { MongoClient } from "mongodb";
// Using Node.js `require()`
// const { MongoClient } = require('mongodb');

//db
let dbInstance = null;

// environment variables
import { env } from "./environment.js";

// Connection URL
const url = env.MONGODB_URL;

export const connectDB = async () => {
  // client connection
  const client = new MongoClient(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected to MongoDB server");

  // Assign the client to out dbInstance
  dbInstance = client.db(env.DATABASE_NAME);
};

// Get database Instance
export const getDB = () => {
  if (!dbInstance) {
    throw new Error("Database not connected");
  }
  return dbInstance;
};
