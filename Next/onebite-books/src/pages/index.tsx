import SearchbarLayout from "@/components/searchbar-layout";
import { ReactNode, useEffect } from "react";
import s from "./index.module.css";
import BookItem from "@/components/book-item";
// import books from "@/mock/books.json";
// import { InferGetServerSidePropsType } from 'next';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from "next/head";

import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

// export async function getServerSideProps(){
export async function getStaticProps(context: GetStaticPropsContext) {
  const allBooks = await fetchBooks();
  const randomBooks = await fetchRandomBooks();

  return { props: {allBooks, randomBooks} };
}

export default function Home({
  // data
  allBooks, randomBooks
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
}:InferGetStaticPropsType<typeof getStaticProps>){
  // console.log(data);

  // useEffect(()=>{
  //   console.log(window.history);
  // }, []);

  return (
    <div>
      <Head>
        <title>한입북스</title>
        <meta property="og:title" content="한입북스-검색결과" />
        <meta property="og:description" content="한입북스에 등록된 도서들을 만나보세요" />
        <meta property="og:image" content="/thumbnail.png" />
      </Head>
      <div className={s.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          { randomBooks.map((book) => (
            <BookItem key={`recommended-${book.id}`} { ...book } />
          ))}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          { allBooks.map((book) => (
            <BookItem key={`all-${book.id}`} { ...book } />
          ))}
        </section>
      </div>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchbarLayout>{page}</SearchbarLayout>;
}