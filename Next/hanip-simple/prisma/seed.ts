import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

const menuData = [
  { name: "아메리카노", price: 4500, description: "깊고 부드러운 시그니처 아메리카노입니다.", category: "DRINK" },
  { name: "카페 라떼", price: 5000, description: "부드러운 우유와 에스프레소의 조화로운 라떼입니다.", category: "DRINK" },
  { name: "말차 라떼", price: 5500, description: "일본 우지산 말차를 사용한 향긋한 라떼입니다.", category: "DRINK" },
  { name: "치즈케이크", price: 7500, description: "진하고 크리미한 정통 뉴욕 스타일 치즈케이크입니다.", category: "DESSERT" },
  { name: "크루아상", price: 4500, description: "겉은 바삭, 속은 촉촉한 프랑스 정통 버터 크루아상입니다.", category: "DESSERT" },
  { name: "초코 브라우니", price: 5500, description: "벨기에 다크 초콜릿으로 만든 진하고 쫀득한 브라우니입니다.", category: "DESSERT" },
];

const reviewData = [
  { menuIdx: 0, author: "커피러버", content: "산미가 적당해서 매일 마셔도 좋아요!" },
  { menuIdx: 0, author: "최지수", content: "블렌딩이 독특해요. 추천합니다." },
  { menuIdx: 1, author: "우유좋아", content: "스팀 밀크가 정말 부드러요." },
  { menuIdx: 3, author: "디저트퀸", content: "진짜 진하고 맛있어요. 강추!" },
  { menuIdx: 4, author: "빵순이", content: "버터 향이 가득해요. 완벽한 식감!" },
  { menuIdx: 5, author: "초코러버", content: "쫀득하고 진해서 너무 맛있어요." },
];

async function main() {
  console.log("시드 시작...");
  await prisma.review.deleteMany();
  await prisma.menu.deleteMany();
  console.log("기존 데이터 삭제");

  const insertedMenus = await prisma.menu.createManyAndReturn({
    data: menuData,
  });
  console.log(`메뉴 ${insertedMenus.length}개 삽입`);

  await prisma.review.createMany({
    data: reviewData.map((r) => ({
      menuId: insertedMenus[r.menuIdx].id,
      author: r.author,
      content: r.content,
    })),
  });
  console.log(`리뷰 ${reviewData.length}개 삽입`);
  console.log("완료!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });