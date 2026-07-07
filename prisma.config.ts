import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // The CLI requires the direct connection to alter tables
    url: env("DIRECT_URL"),
  },
});