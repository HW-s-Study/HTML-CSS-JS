import { ReviewData } from "@/types";
import style from "./page.module.css";


export default async function ReviewList({ bookId }: { bookId: string }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review/book/${bookId}`,{cache:"force-cache"});
  const reviews: ReviewData[] = await response.json();

  return (
    <div className={style.memo_box}>
      <p className={style.memo_label}>메모이제이션 확인용 컴포넌트</p>
      <p>총 리뷰 수: {reviews.length}개</p>
    </div>
  );
}
