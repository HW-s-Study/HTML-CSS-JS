"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";

export default function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQ = searchParams.get("q") ?? "";

  function handleSubmit(formData: FormData) {
    const q = (formData.get("q") as string).trim();
    if (q) {
      router.push(`/?q=${encodeURIComponent(q)}`);
    } else {
      router.push("/");
    }
  }

  return (
    <form action={handleSubmit} className={styles.searchForm}>
      <input
        type="text"
        name="q"
        defaultValue={currentQ}
        placeholder="제목이나 내용으로 검색..."
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>
        검색
      </button>
      {currentQ && (
        <button
          type="button"
          onClick={() => router.push("/")}
          className={styles.clearButton}
        >
          초기화
        </button>
      )}
    </form>
  );
}
