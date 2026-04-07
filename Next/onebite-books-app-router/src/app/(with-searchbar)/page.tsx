// "use client"
// import { useEffect, useState } from "react";
import { BookData } from "@/types";
import BookItem from "@/components/book-item";
import style from "./page.module.css";
// import mock from "@/mock/books.json"

async function AllBooks() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book`, {
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

async function RecoBooks() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/random`, {
        next: { revalidate: 3 },
    });
    if (!response.ok) throw new Error(response.statusText);

    const recoBooks: BookData[] = await response.json();

    return (
        <div>
            {recoBooks.map((book) => (
                <BookItem key={book.id} {...book} />
            ))}
        </div>
    );
}


export default async function Home() {
    return (
        <div className={style.container}>
            <section>
                <h3>지금 추천하는 도서</h3>
                <RecoBooks />
            </section>
            <section>
                <h3>등록된 모든 도서</h3>
                <AllBooks />
            </section>
        </div>
    );
}