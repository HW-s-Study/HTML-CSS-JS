import Link from "next/link";
import { prisma } from "@/lib/prisma";
import EditForm from "./edit-form";
import styles from "./edit.module.css";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
    select: { id: true, title: true, body: true },
  });

  if (!post) {
    return (
      <main className={styles.container}>
        <div className={styles.card}>
          <p>존재하지 않는 게시글입니다.</p>
          <Link href="/">← 목록으로</Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>게시글 수정</h1>
        <p className={styles.subtitle}>
          제목과 내용을 수정하고 비밀번호를 입력하세요.
        </p>
        <EditForm post={post} />
      </div>
    </main>
  );
}
