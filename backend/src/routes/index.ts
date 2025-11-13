import type { Express } from "express";

import { authRouter } from "./modules/auth.routes.js";

export const registerRoutes = (app: Express) => {
  app.use("/api/auth", authRouter);
};

