import SearchbarLayout from "@/components/searchbar-layout";
import { ReactNode } from "react";
import s from "./index.module.css";

export default function Home() {

  return (
    <div className={s.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchbarLayout>{page}</SearchbarLayout>;
}