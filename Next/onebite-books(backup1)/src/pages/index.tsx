import SearchbarLayout from "@/components/searchbar-layout";
import { ReactNode } from "react";
import s from "./index.module.css";

export default function Home() {

  return (
    <div>
      <h1 className={s.title}>인덱스 페이지입니다.</h1>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchbarLayout>{page}</SearchbarLayout>;
}