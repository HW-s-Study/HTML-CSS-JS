// "use client"
// import { useEffect, useState } from "react";
import { BookData } from "@/types";
import BookItem from "@/components/book-item";
import style from "./page.module.css";
// import mock from "@/mock/books.json"

async function AllBooks() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/book`, {
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
    } catch (err) {
        console.error(err);
        return <div>오류가 발생했습니다.</div>;
    }
}

async function RecoBooks() {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_SERVER}/book/random`,{
            next: { tags: ["random-books"] },
        });
        if (!response.ok) throw new Error(response.statusText);
        const randomBooks: BookData[] = await response.json();

        return (
            <div>
                {randomBooks.map((book) => (
                    <BookItem key={book.id} {...book} />
                ))}
            </div>
        );
    } catch (err) {
        console.error(err);
        return <div>오류가 발생했습니다.</div>;
    }
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