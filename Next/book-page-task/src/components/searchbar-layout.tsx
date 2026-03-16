import { ReactNode, useState } from "react";

export default function SearchbarLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [search, setSearch] = useState("");

  const onChangeSerch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  
  return (
    <div>
      <div>
        <input
          value={search}
          onChange={onChangeSerch}
          placeholder="검색어를 입력하세요..."
        />
        <button>검색</button>
      </div>
      {children}
    </div>
  );
}