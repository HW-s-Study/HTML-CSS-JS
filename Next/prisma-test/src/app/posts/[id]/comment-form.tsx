"use client";

import addComment from "@/app/actions/add_comment.action";
import { useActionState, useEffect } from "react";
import styles from "./detail.module.css";

export default function CommentForm({ postId }: { postId: number }) {
  const [state, action, isPending] = useActionState(addComment, null);

  useEffect(() => {
    if (state && !state.status) {
      alert(state.message);
    }
  }, [state]);

  return (
    <form action={action}>
      <input type="hidden" name="postId" value={postId} />
      <input
        type="text"
        name="comment"
        placeholder="댓글을 입력하세요"
        required
        className={styles.commentInput}
      />
      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        required
        className={styles.commentPassword}
      />
      <button
        type="submit"
        disabled={isPending}
        className={styles.commentSubmit}
      >
        등록
      </button>
    </form>
  );
}
