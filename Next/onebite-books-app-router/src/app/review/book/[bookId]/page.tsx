import ReviewList from "./ReviewList";
import style from "./page.module.css";
import { ReviewData } from "@/types";


export default async function Page({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review/book/${bookId}`,{cache:"force-cache"});
  const reviews: ReviewData[] = await response.json();

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
}
