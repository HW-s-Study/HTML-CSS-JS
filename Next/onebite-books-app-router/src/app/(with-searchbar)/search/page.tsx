// import ClientComponent from "../client-component";
// import mock from '@/mock/books.json'
import { BookData } from "@/types";
import BookItem from "@/components/book-item";

export default async function Page ({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {

  try {
    const { q } = await searchParams;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/book/search?q=${q}`
    );
    if (!response.ok) throw new Error(response.statusText);
    const books: BookData[] = await response.json();

    return (
      <div>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </div>
    );
  } catch (err) {
    console.error(err);
    return <div>오류가 발생했습니다.</div>;
  }
}