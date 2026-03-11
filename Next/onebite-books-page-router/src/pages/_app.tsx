import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <header>
        <Link href={"/"}>홈</Link>
        &nbsp;
        <Link href={"/search"}>검색</Link>
        &nbsp;
        
        <button onClick={() => {
          router.push("/book/1");
        }}>
          1번 도서
        </button>
      </header>
      <Component {...pageProps} />
    </>
  );
}