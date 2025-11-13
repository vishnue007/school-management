import mongoose from "mongoose";

import { env } from "./env.js";

let isConnected = false;

export const connectDatabase = async () => {
  if (isConnected) {
    return;
  }

  mongoose.set("strictQuery", true);

  await mongoose.connect(env.MONGODB_URI, {
    dbName: env.MONGODB_DB
  });

  isConnected = true;
};

