"use client";

import Link from "next/link";
import updatePost from "@/app/actions/update_post.action";
import { useActionState, useEffect } from "react";
import styles from "./edit.module.css";

type EditFormProps = {
  post: { id: number; title: string; body: string };
};

export default function EditForm({ post }: EditFormProps) {
  const [state, action, isPending] = useActionState(updatePost, null);

  useEffect(() => {
    if (state && !state.status) alert(state.message);
  }, [state]);

  return (
    <form action={action} className={styles.form}>
      <input type="hidden" name="postId" value={post.id} />

      <div className={styles.field}>
        <label htmlFor="title" className={styles.label}>
          제목
        </label>
        <input
          id="title"
          name="title"
          defaultValue={post.title}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="body" className={styles.label}>
          내용
        </label>
        <textarea
          id="body"
          name="body"
          defaultValue={post.body}
          required
          className={styles.textarea}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="password" className={styles.label}>
          비밀번호
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="작성 시 입력한 비밀번호"
          required
          className={styles.input}
        />
      </div>

      <div className={styles.buttonRow}>
        <Link href={`/posts/${post.id}`} className={styles.cancelLink}>
          취소
        </Link>
        <button type="submit" disabled={isPending} className={styles.button}>
          {isPending ? "수정 중..." : "수정하기"}
        </button>
      </div>
    </form>
  );
}
