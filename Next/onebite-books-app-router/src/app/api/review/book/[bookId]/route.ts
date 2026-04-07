import { NextRequest } from "next/server";
import reviews from "@/mock/reviews.json";
import { ReviewData } from "@/types";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ bookId: string }> },
) {
  try {
    const { bookId } = await params;
    const bookIdNum = parseInt(bookId);

    if (isNaN(bookIdNum)) {
      return new Response(
        JSON.stringify({ error: "유효하지 않은 책 ID입니다" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // 해당 책의 리뷰들 필터링
    const bookReviews: ReviewData[] = reviews.filter(
      (review) => review.bookId === bookIdNum,
    );

    return new Response(JSON.stringify(bookReviews), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[GET /api/review/book/[bookId]] 에러:", error);
    return new Response(JSON.stringify({ error: "서버 내부 오류" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
