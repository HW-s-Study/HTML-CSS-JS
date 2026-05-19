import Link from "next/link";
import { prisma } from "@/lib/prisma";
import styles from "./detail.module.css";
import CommentForm from "./comment-form";
import CommentItem from "./comment_item";
import PasswordForm from "./password-form";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
    include: { comments: { orderBy: { createdAt: "desc" } } },
  });

  if (!post) {
    return (
      <main className={styles.container}>
        <div className={styles.card}>
          <p className={styles.notFound}>존재하지 않는 게시글입니다.</p>
          <Link href="/" className={styles.backLink}>
            ← 목록으로
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="/" className={styles.backLink}>
          ← 목록으로
        </Link>

        <article className={styles.card}>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.meta}>
            <span>
              작성일 {new Date(post.createdAt).toLocaleString("ko-KR")}
            </span>
          </div>
          <div className={styles.body}>{post.body}</div>
        </article>

        <div className={styles.actions}>
          <Link href={`/posts/${post.id}/edit`} className={styles.editLink}>
            수정하기
          </Link>
          <PasswordForm postId={post.id} />
        </div>

        <section className={styles.commentSection}>
          <h2 className={styles.commentTitle}>
            댓글 <span className={styles.count}>{post.comments.length}</span>
          </h2>

          <CommentForm postId={post.id} />

          {post.comments.length === 0 ? (
            <p className={styles.commentEmpty}>아직 댓글이 없습니다.</p>
          ) : (
            <ul className={styles.commentList}>
              {post.comments.map((c) => (
                <CommentItem key={c.id} postId={post.id} comment={c} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
