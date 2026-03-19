import { useRouter } from "next/router";
import { ReactNode, useState, useEffect } from "react";
import style from "./searchbar-layout.module.css";

export default function SearchbarLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const onChangeSerch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setSearch((router.query.q as string) || "");
  }, [router.query.q]);

  const onSubmitSearch = () => {
    if (!search || router.query.q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmitSearch();
    }
  };

  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          value={search}
          onChange={onChangeSerch}
          onKeyDown={onKeyDown}
          placeholder="검색어를 입력하세요..."
        />
        <button onClick={onSubmitSearch}>검색</button>
      </div>
      {children}
    </div>
  );
}