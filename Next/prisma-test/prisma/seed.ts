import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;
const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  const posts = await prisma.post.createManyAndReturn({
    data: [
      {
        title: "Hello",
        body: "World",
        password: "1234",
      },
    ],
  });
  await prisma.comment.createMany({
    data: [
      {
        postId: posts[0].id,
        comment: "Good",
        password: "1234",
      },
    ],
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});