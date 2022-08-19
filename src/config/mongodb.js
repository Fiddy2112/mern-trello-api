import { MongoClient } from "mongodb";
// Using Node.js `require()`
// const { MongoClient } = require('mongodb');

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
  try {
    // Use connect method to connect to the server
    await client.connect();
    console.log("Connected successfully to server");

    // List database
    await listDatabase(client);
  } catch (e) {
    console.log("Error connecting to database", e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

const listDatabase = async (client) => {
  const databasesList = await client.db().admin().listDatabases();
  console.log(databasesList);
  console.log("Your databases: ");
  databasesList.databases.forEach((db) => {
    console.log(`- ${db.name}`);
  });
};
