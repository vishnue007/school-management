import { createServer } from "http";

import { createApp } from "./app.js";
import { env } from "./config/env.js";

const app = createApp();
const server = createServer(app);

server.listen(env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${env.PORT}`);
});

