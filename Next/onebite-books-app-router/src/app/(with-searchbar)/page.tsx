// "use client"
// import { useEffect, useState } from "react";
import { BookData } from "@/types";
import BookItem from "@/components/book-item";
import style from "./page.module.css";
// import mock from "@/mock/books.json"

async function AllBooks() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/book`);
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


export default function Home() {
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