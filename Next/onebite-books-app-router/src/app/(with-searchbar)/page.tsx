// import books from "@/mock/books.json"
import BookItem from "@/components/book-item";
import style from "./page.module.css"
import { BookData } from "@/types";

async function AllBooks() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/book`);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const allBooks: BookData[] = await response.json();

        return (
            <div>
                {allBooks.map((book) => (
                    <BookItem key={book.id} {...book} />
                ))}
            </div>
        );
    } catch (err) {
        console.log(err);
        return <div>오류가 발생했습니다.</div>;
    }
}

async function RecoBooks() {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER}/book/random`
    );
    const randomBooks: BookData[] = await response.json();

    return (
        <div>
            {randomBooks.map((book) => (
                <BookItem key={book.id} {...book} />
            ))}
        </div>
    );
}

// export default async function Home() {
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/book`);
    // const allBooks: BookData[] = await response.json();
export default function Home() {

    return (
        <div className={style.container}>
            <section>
                <h3>지금 추천하는 도서</h3>
                <RecoBooks />
                {/* {allBooks.map((book)=>(
                    <BookItem key={book.id} {...book}/>
                ))} */}
            </section>
            <section>
                <h3>등록된 모든 도서</h3>
                <AllBooks />
                {/* {allBooks.map((book)=>(
                    <BookItem key={book.id} {...book}/>
                ))} */}
            </section>
        </div>
    );
}