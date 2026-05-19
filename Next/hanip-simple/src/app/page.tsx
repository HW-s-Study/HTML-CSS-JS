import Link from "next/link";
import { prisma } from "@/lib/prisma";

interface Props {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export default async function HomePage({ searchParams }: Props) {
  const { q, category } = await searchParams;

  // Prisma 동적 쿼리 조건 설정
  const whereClause: any = {};
  if (category && category !== "ALL") {
    whereClause.category = category;
  }
  if (q) {
    whereClause.name = {
      contains: q,
      mode: "insensitive", // 대소문자 구분 없음
    };
  }

  const menus = await prisma.menu.findMany({
    where: whereClause,
    orderBy: { id: "asc" },
  });

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>☕ 한입 카페</h1>
      <p>메뉴를 확인하고 리뷰를 남겨보세요</p>

      {/* 카테고리 탭 필터 */}
      <div style={{ margin: "15px 0" }}>
        <Link href="/" style={{ marginRight: "10px", fontWeight: !category ? "bold" : "normal" }}>전체</Link> | 
        <Link href="/?category=DRINK" style={{ margin: "0 10px", fontWeight: category === "DRINK" ? "bold" : "normal" }}>음료</Link> | 
        <Link href="/?category=DESSERT" style={{ marginLeft: "10px", fontWeight: category === "DESSERT" ? "bold" : "normal" }}>디저트</Link>
      </div>

      {/* 검색 바 */}
      <form method="GET" action="/" style={{ marginBottom: "20px" }}>
        {category && <input type="hidden" name="category" value={category} />}
        <input 
          type="text" 
          name="q" 
          defaultValue={q || ""} 
          placeholder="메뉴 이름 검색" 
          style={{ padding: "5px", width: "200px" }}
        />
        <button type="submit" style={{ padding: "5px 10px", marginLeft: "5px" }}>검색</button>
      </form>

      {/* 메뉴 리스트 */}
      <ul>
        {menus.map((menu) => (
          <li key={menu.id} style={{ margin: "10px 0" }}>
            <Link href={`/menus/${menu.id}`} style={{ textDecoration: "none", color: "#0066cc", fontWeight: "bold" }}>
              {menu.name}
            </Link>{" "}
            - {menu.price.toLocaleString()}원 ({menu.category === "DRINK" ? "음료" : "디저트"})
          </li>
        ))}
      </ul>
    </div>
  );
}