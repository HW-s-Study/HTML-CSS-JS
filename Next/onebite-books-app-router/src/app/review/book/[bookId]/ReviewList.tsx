import allReviews from "@/mock/reviews.json";
import { ReviewData } from "@/types";
import style from "./page.module.css";

function getReviews(bookId: string): ReviewData[] {
  return allReviews.filter((review) => review.bookId === Number(bookId));
}

export default async function ReviewList({ bookId }: { bookId: string }) {
  const reviews = getReviews(bookId);

  return (
    <div className={style.memo_box}>
      <p className={style.memo_label}>메모이제이션 확인용 컴포넌트</p>
      <p>총 리뷰 수: {reviews.length}개</p>
    </div>
  );
}
