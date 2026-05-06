import style from "./page.module.css";
import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";
import BookItemSkeleton from "@/components/book-item-skeleton";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense
          fallback={new Array(3).fill(0).map((_, idx) => (
            <BookItemSkeleton key={`random-book-skeleton-${idx}`} />
          ))}
        >
          <RandomBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense
          fallback={new Array(5).fill(0).map((_, idx) => (
            <BookItemSkeleton key={`all-book-skeleton-${idx}`} />
          ))}
        >
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
async function AllBooks() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book`, {
    cache: "force-cache",
  });
  await delay(3000);
  const allBooks: BookData[] = await response.json();
  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RandomBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/book/random`,
    { next: { revalidate: 3 } },
  );
  await delay(5000);
  const randomBooks: BookData[] = await response.json();
  return (
    <div>
      {randomBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
