import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaNeon } from "@prisma/adapter-neon";

const databaseUrl = process.env.DATABASE_URL;

console.log("DATABASE_URL exists:", Boolean(databaseUrl));

try {
  const parsedUrl = new URL(databaseUrl!);
  console.log("Database protocol:", parsedUrl.protocol);
  console.log("Database hostname:", parsedUrl.hostname);
} catch {
  console.log("DATABASE_URL is invalid");
}

const adapter = new PrismaNeon({
  connectionString: databaseUrl,
});

export const prisma = new PrismaClient({ adapter });
