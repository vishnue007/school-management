import { createServer } from "http";

import { createApp } from "./app.js";
import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";

const app = createApp();
const server = createServer(app);

const bootstrap = async () => {
  try {
    await connectDatabase();

    server.listen(env.PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on http://localhost:${env.PORT}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

void bootstrap();
