import { useRouter } from "next/router";
import { ReactNode, useState } from "react";

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

  const onSubmitSearch = () => {
    if (!search || router.query.q === search) return;
    router.push(`/search?q=${search}`);
  };

  return (
    <div>
      <div>
        <input
          value={search}
          onChange={onChangeSerch}
          placeholder="검색어를 입력하세요..."
        />
        <button onClick={onSubmitSearch}>검색</button>
      </div>
      {children}
    </div>
  );
}