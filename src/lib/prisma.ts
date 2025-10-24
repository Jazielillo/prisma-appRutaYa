import { PrismaClient } from "../../generated/prisma";

// Instantiate a single PrismaClient for the whole app
// Cast to any temporarily to avoid type mismatches if the generated client is stale
export const prisma = new PrismaClient() as any;

// Optional: clean shutdown in dev/CLI
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});
