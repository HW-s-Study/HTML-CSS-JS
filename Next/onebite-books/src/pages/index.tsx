import SearchbarLayout from "@/components/searchbar-layout";
import { ReactNode, useEffect } from "react";
import s from "./index.module.css";
import BookItem from "@/components/book-item";
import books from "@/mock/books.json";
import { InferGetServerSidePropsType } from 'next';

export function getServerSideProps(){
  const data = "임시 데이터";
  return { props: {data} };
}

export default function Home({
  data
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(data);

  useEffect(()=>{
    console.log(window.history);
  }, []);

  return (
    <div className={s.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        { books.map((book) => (
          <BookItem key={`recommended-${book.id}`} { ...book } />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        { books.map((book) => (
          <BookItem key={`all-${book.id}`} { ...book } />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchbarLayout>{page}</SearchbarLayout>;
}