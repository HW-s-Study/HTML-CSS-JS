"use client";

import deletePost from "@/app/actions/delete_post.action";
import { useActionState, useEffect } from "react";
import styles from "./detail.module.css";

export default function PasswordForm({ postId }: { postId: number }) {
  const [state, action, isPending] = useActionState(deletePost, null);

  useEffect(() => {
    if (state && !state.status) alert(state.message);
  }, [state]);

  return (
    <form action={action} className={styles.deleteForm}>
      <input type="hidden" name="postId" value={postId} />
      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        required
        className={styles.deleteInput}
      />
      <button
        type="submit"
        disabled={isPending}
        className={styles.deleteButton}
      >
        삭제하기
      </button>
    </form>
  );
}
