import { ReactNode } from "react";

export default function SearchbarLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      <header>임시 검색 폼</header>
      <main>{children}</main>
    </div>
  );
}