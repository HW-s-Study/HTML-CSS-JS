import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <Link href={"/books"}>BOOKS</Link>
          &nbsp;
          <Link href={"/authors"}>AUTHROS</Link>
        </header>
        <main>{children}</main>
        <footer>제작 @winterlood</footer>
      </body>
    </html>
  );
}
