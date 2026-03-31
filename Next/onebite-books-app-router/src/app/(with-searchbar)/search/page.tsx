import ClientComponent from "../client-component";
import { BookData } from "@/types";
import BookItem from "@/components/book-item";
import mock from '@/mock/books.json'

export default async function Page ({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const books: BookData[] = mock;
  const qStr = (q ?? "").toLowerCase();

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(qStr)
  );

  return (
    <ClientComponent>
      {filteredBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </ClientComponent>
  );
}