import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  MONGODB_URI: z
    .string()
    .min(1)
    .default("mongodb://127.0.0.1:27017"),
  MONGODB_DB: z.string().min(1).default("school-management")
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  // eslint-disable-next-line no-console
  console.error("Invalid environment configuration", parsed.error.flatten());
  process.exit(1);
}

export const env = parsed.data;

