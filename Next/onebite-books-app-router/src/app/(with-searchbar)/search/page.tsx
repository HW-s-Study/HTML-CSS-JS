import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import {delay} from "@/util/delay";
import { Suspense } from "react";
import BookItemSkeleton from "@/components/book-item-skeleton";

async function SearchResult({q}:{q:string}) {
  await delay(3000);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/search?q=${q}`,{cache: "force-cache"});
  if (!response.ok) throw new Error(response.statusText);
  const books: BookData[] = await response.json();
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default async function Page({searchParams}:{searchParams:Promise<{q? :string}>;}) {
  const {q} = await searchParams;

  return(
    <Suspense key={q || ""} fallback={new Array(3).fill(0).map((_, idx) => (
      <BookItemSkeleton key={`search-result-skeleton-${idx}`} />
    ))}>
      <SearchResult q={q || ""} />
    </Suspense>
  );
}