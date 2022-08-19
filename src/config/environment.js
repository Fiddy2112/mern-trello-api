import "dotenv/config";
export const env = {
  PORT: process.env.PORT,
  HOST_NAME: process.env.HOST_NAME,
  MONGODB_URL: process.env.MONGODB_URL,
};
