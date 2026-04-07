import reviews from "@/mock/reviews.json";
import ReviewList from "./ReviewList";
import style from "./page.module.css";
import { ReviewData } from "@/types";

// 메모이제이션 캐시
const reviewCache = new Map<string, ReviewData[]>();

async function getReviews(bookId: string): Promise<ReviewData[]> {
  // 캐시 확인 (메모이제이션)
  if (reviewCache.has(bookId)) {
    console.log(`[메모이제이션] 캐시된 리뷰 데이터 사용: bookId=${bookId}`);
    return reviewCache.get(bookId)!;
  }

  try {
    console.log(`[데이터 페칭] 리뷰 데이터 요청: /review/book/${bookId}`);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review/book/${bookId}`, {
      next: { revalidate: 1800 }, // 30분 캐시 (ISR)
    });

    if (!response.ok) {
      throw new Error(`리뷰 조회 실패: ${response.status} ${response.statusText}`);
    }

    const reviews: ReviewData[] = await response.json();
    console.log(`[데이터 페칭] ${reviews.length}개의 리뷰 데이터 수신`);

    // 캐시 저장 (메모이제이션)
    reviewCache.set(bookId, reviews);

    return reviews;
  } catch (error) {
    console.error('[getReviews] 에러:', error);

    // 에러 발생 시 mock 데이터로 폴백
    console.log('[폴백] mock 데이터로 대체');
    const mockReviews = reviews.filter((review) => review.bookId === Number(bookId));
    return mockReviews;
  }
}

// 기존 mock 데이터 함수 (주석 처리)
// function getReviews(bookId: string): ReviewData[] {
//   return reviews.filter((review) => review.bookId === Number(bookId));
// }

export default async function Page({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;

  try {
    const reviews = await getReviews(bookId);

    return (
      <div className={style.container}>
        <h3 className={style.title}> 리뷰 목록</h3>
        <ReviewList bookId={bookId} />
        {reviews.map((review) => (
          <div key={review.id} className={style.review_item}>
            <p className={style.content}>{review.content}</p>
            <div className={style.meta}>
              <span className={style.author}>{review.author}</span>
              <span className={style.date}>
                {new Date(review.createdAt).toLocaleDateString("ko-KR")}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error('[Review Page] 에러:', error);

    // 에러 발생 시 mock 데이터로 폴백
    const mockReviews = reviews.filter((review) => review.bookId === Number(bookId));

    return (
      <div className={style.container}>
        <h3 className={style.title}> 리뷰 목록</h3>
        <div style={{ color: 'red', marginBottom: '16px' }}>
          ⚠️ API 호출 실패로 mock 데이터를 표시합니다.
        </div>
        <ReviewList bookId={bookId} />
        {mockReviews.map((review) => (
          <div key={review.id} className={style.review_item}>
            <p className={style.content}>{review.content}</p>
            <div className={style.meta}>
              <span className={style.author}>{review.author}</span>
              <span className={style.date}>
                {new Date(review.createdAt).toLocaleDateString("ko-KR")}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
