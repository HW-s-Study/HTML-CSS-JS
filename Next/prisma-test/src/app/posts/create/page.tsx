"use client";
import addPost from "@/app/actions/add_post.action";
import { useActionState, useEffect } from "react";
import { redirect } from "next/navigation";
import styles from "./create.module.css";

export default function CreatePostPage() {
  const [state, action, isPending] = useActionState(addPost, null);

  useEffect(() => {
    if (state) {
      alert(state.message);
      if (state.status) {
        redirect("/");
      }
    }
  }, [state]);

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>새 게시글 작성</h1>
        <p className={styles.subtitle}>제목과 내용을 입력해 주세요.</p>

        <form action={action} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="title" className={styles.label}>
              제목
            </label>
            <input
              id="title"
              name="title"
              placeholder="제목을 입력하세요"
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
              placeholder="내용을 입력하세요"
              required
              rows={8}
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
              placeholder="수정/삭제 시 필요합니다"
              required
              className={styles.input}
            />
          </div>

          <button type="submit" disabled={isPending} className={styles.button}>
            {isPending ? "저장 중..." : "저장하기"}
          </button>
        </form>
      </div>
    </main>
  );
}
