import { BookData } from "@/types"
import BookItem from "@/components/book-item";

async function AllBooks() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
        cache: "force-cache",
    });
    if (!response.ok) throw new Error(response.statusText);

    const allBooks: BookData[] = await response.json();
    return (
        <div>
            {allBooks.map((book) => (
                <BookItem key={book.id} {...book} />
            ))}
        </div>
    );
}

export default async function Page() {
  return (
    <div>
      <AllBooks />
    </div>
  )
}