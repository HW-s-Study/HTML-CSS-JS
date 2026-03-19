import SearchbarLayout from "@/components/searchbar-layout";
import { ReactNode, useEffect } from "react";
import s from "./index.module.css";
import { InferGetServerSidePropsType } from 'next';

export function getServerSideProps(){
  const data = "임시 데이터";
  return { props: {data} };
}

export default function Home({
  data
}:InferGetServerSidePropsType<typeof getServerSideProps>) { // getServerSideProps의 반환값 자동 추론
  console.log(data);

  useEffect(()=>{
    console.log(window.history);
  }, []);

  return (
    <div>
      <h1 className={s.title}>인덱스 페이지입니다.</h1>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchbarLayout>{page}</SearchbarLayout>;
}