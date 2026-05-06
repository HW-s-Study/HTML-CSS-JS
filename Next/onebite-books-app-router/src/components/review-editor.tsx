"use client";
import style from "./review-editor.module.css";
import createReviewAction from "../actions/create-review.action";
import { useActionState, useEffect } from "react";

export default function ReviewEditor({bookId}:{bookId:string}) {
  const [state, action, isPending] = useActionState(createReviewAction, null);

  useEffect(() => {
    if (state && !state.status) {
      alert(state.message);
    }
  }, [state]);

  return (
    <section className={style.container}>
      <form action={action}>
        <input name="bookId" value={bookId} type="hidden" readOnly />
        <textarea disabled={isPending} required name="content" placeholder="리뷰 내용" />
        <div className={style.submit_container}>
          <input disabled={isPending} name="author" placeholder="작성자" />
          <button disabled={isPending} type="submit">
            작성하기
          </button>
        </div>
      </form>
    </section>
  );
}