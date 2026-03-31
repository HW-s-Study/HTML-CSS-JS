import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css"

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>홈</Link>&nbsp;
            <Link href={"/search"}>검색</Link>&nbsp;
            <Link href={"/book/1"}>1번 책 상세보기</Link>
          </header>

          <main>{children}</main>
          
          <footer>제작 @winterlood</footer>
        </div>
      </body>
    </html>
  );
}
