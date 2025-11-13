import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { registerRoutes } from "./routes/index.js";

export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: "*"
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
  );

  registerRoutes(app);

  app.use((req, res) => {
    res.status(404).json({
      message: "Resource not found"
    });
  });

  app.use(
    (
      err: Error,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      // eslint-disable-next-line no-console
      console.error(err);
      res.status(500).json({
        message: "Unexpected error",
        error: process.env.NODE_ENV === "development" ? err.message : undefined
      });
      next();
    }
  );

  return app;
};

