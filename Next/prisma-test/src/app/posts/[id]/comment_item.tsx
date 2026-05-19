"use client";

import type { Comment } from "@/generated/prisma/client";
import deleteComment from "@/app/actions/delete_comment.action";
import { useActionState, useEffect } from "react";
import styles from "./detail.module.css";

export default function CommentItem({
  postId,
  comment,
}: {
  postId: number;
  comment: Comment;
}) {
  const [state, action, isPending] = useActionState(deleteComment, null);

  useEffect(() => {
    if (state) alert(state.message);
  }, [state]);

  return (
    <form action={action} className={styles.commentItemForm}>
      <div className={styles.commentItemTop}>
        <p className={styles.commentItemText}>{comment.comment}</p>
        <span className={styles.commentItemDate}>
          {new Date(comment.createdAt).toLocaleString("ko-KR")}
        </span>
      </div>
      <div className={styles.commentItemActions}>
        <input type="hidden" name="postId" value={postId} />
        <input type="hidden" name="commentId" value={comment.id} />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          required
          className={styles.commentDeleteInput}
        />
        <button
          type="submit"
          disabled={isPending}
          className={styles.commentDeleteButton}
        >
          삭제
        </button>
      </div>
    </form>
  );
}
