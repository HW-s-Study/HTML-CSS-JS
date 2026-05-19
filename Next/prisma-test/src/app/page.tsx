import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Post } from "@/generated/prisma/client";
import styles from "./page.module.css";
import SearchForm from "./search-form";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const posts: Post[] = await prisma.post.findMany({
    where: q
      ? {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { body: { contains: q, mode: "insensitive" } },
          ],
        }
      : undefined,
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1 className={styles.title}>게시판</h1>
          <Link href="/posts/create" className={styles.writeButton}>
            글쓰기
          </Link>
        </header>

        <SearchForm />

        {q && (
          <p className={styles.searchInfo}>
            <strong>&quot;{q}&quot;</strong> 검색 결과 {posts.length}건
          </p>
        )}

        {posts.length === 0 ? (
          <div className={styles.empty}>
            <p>아직 게시글이 없습니다.</p>
            <p className={styles.emptySub}>첫 번째 글을 작성해 보세요!</p>
          </div>
        ) : (
          <ul className={styles.list}>
            {posts.map((post) => (
              <li key={post.id} className={styles.item}>
                <Link href={`/posts/${post.id}`} className={styles.link}>
                  <span className={styles.itemTitle}>{post.title}</span>
                  <span className={styles.itemDate}>
                    {new Date(post.createdAt).toLocaleDateString("ko-KR")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
