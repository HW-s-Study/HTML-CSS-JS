import GlobalLayout from "@/components/global-layout";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { NextPage } from "next";
import { ReactNode } from "react";

type NextPageWithLayout = NextPage & {
  getLayout: (page:ReactNode) => ReactNode
}


export default function App({ Component, pageProps }: AppProps & {Component:NextPageWithLayout}) {
  const getLayout = Component.getLayout || ((page) => page); // getLayout이 없는 페이지는 전달받은 컴포넌트를 그대로 렌더링하도록 기본값 설정
  // console.log(getLayout);
  
  return (
    <GlobalLayout>
      {getLayout(<Component {...pageProps} />)}
    </GlobalLayout>
  );
}