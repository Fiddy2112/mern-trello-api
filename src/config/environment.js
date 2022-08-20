import "dotenv/config";
export const env = {
  APP_PORT: process.env.APP_PORT,
  APP_HOST: process.env.APP_HOST,
  DATABASE_NAME: process.env.DATABASE_NAME,
  MONGODB_URL: process.env.MONGODB_URL,
};
