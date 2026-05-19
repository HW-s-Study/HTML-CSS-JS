import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function MenuDetailPage({ params }: Props) {
  const { id } = await params;
  const menuId = parseInt(id, 10);

  if (isNaN(menuId)) notFound();

  // 메뉴 정보와 하위 리뷰 조회
  const menu = await prisma.menu.findUnique({
    where: { id: menuId },
    include: { reviews: { orderBy: { createdAt: "desc" } } },
  });

  if (!menu) notFound();

  // Server Action: 리뷰 등록
  async function createReview(formData: FormData) {
    "use server";
    const author = formData.get("author") as string;
    const content = formData.get("content") as string;

    if (!author || !content) return;

    await prisma.review.create({
      data: {
        menuId,
        author,
        content,
      },
    });

    revalidatePath(`/menus/${menuId}`);
  }

  // Server Action: 리뷰 삭제
  async function deleteReview(formData: FormData) {
    "use server";
    const reviewId = formData.get("reviewId") as string;
    
    await prisma.review.delete({
      where: { id: parseInt(reviewId, 10) },
    });

    revalidatePath(`/menus/${menuId}`);
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <Link href="/" style={{ textDecoration: "none", color: "#555" }}>← 목록으로</Link>
      
      <h1 style={{ marginTop: "20px", marginBottom: "5px" }}>{menu.name}</h1>
      <p style={{ margin: "5px 0", color: "#666" }}>카테고리: {menu.category === "DRINK" ? "음료" : "디저트"}</p>
      <p style={{ margin: "5px 0", fontWeight: "bold" }}>가격: {menu.price.toLocaleString()}원</p>
      <p style={{ marginTop: "15px", marginBottom: "30px", fontSize: "1.1rem" }}>{menu.description}</p>

      <hr />

      <h2>리뷰 ({menu.reviews.length})</h2>

      {/* 리뷰 작성 폼 */}
      <form action={createReview} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "400px", marginBottom: "20px" }}>
        <input type="text" name="author" placeholder="작성자" required style={{ padding: "5px" }} />
        <textarea name="content" placeholder="리뷰를 남겨주세요" required rows={3} style={{ padding: "5px" }} />
        <button type="submit" style={{ width: "80px", padding: "5px" }}>리뷰 등록</button>
      </form>

      {/* 리뷰 목록 */}
      {menu.reviews.length === 0 ? (
        <p style={{ color: "#888" }}>• 아직 리뷰가 없습니다.</p>
      ) : (
        <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
          {menu.reviews.map((review) => (
            <li key={review.id} style={{ borderBottom: "1px solid #eee", padding: "10px 0" }}>
              <div style={{ fontWeight: "bold" }}>{review.author}</div>
              <div style={{ margin: "5px 0" }}>{review.content}</div>
              
              {/* 리뷰 삭제 폼 */}
              <form action={deleteReview}>
                <input type="hidden" name="reviewId" value={review.id} />
                <button type="submit" style={{ backgroundColor: "#eee", border: "1px solid #ccc", padding: "2px 5px", cursor: "pointer", fontSize: "0.85rem" }}>
                  삭제
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}