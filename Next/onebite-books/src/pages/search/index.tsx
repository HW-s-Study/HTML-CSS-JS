import SearchbarLayout from "@/components/searchbar-layout";
import { ReactNode } from "react";
// import {useRouter} from "next/router";
import BookItem from "@/components/book-item";
// import books from "@/mock/books.json";
import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import fetchBooks from "@/lib/fetch-books";

export async function getServerSideProps(context:GetServerSidePropsContext) {
  const q = context.query.q;
  const books = await fetchBooks(q as string);
  return { props:{books}};
}

export default function Page({books}:InferGetServerSidePropsType<typeof getServerSideProps>) {
  // const router = useRouter();
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
    // q는 변수명으로 검색어를 담을 변수 /search?q=검색어 형태로 요청이 들어오면 q에 검색어가 담긴다
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchbarLayout>{page}</SearchbarLayout>;
}