"use client"
import { useEffect, useState } from "react";
import { BookData } from "@/types";
import BookItem from "@/components/book-item";
import mock from "@/mock/books.json"

export default function Home() {
  const [books, setBooks] = useState<BookData[]>([])
  useEffect(()=>{
    setBooks(mock)
  })
  
  return (
    <div>
        <section>
        <h3>지금 추천하는 도서</h3>
        {books.map((book)=>(
          <BookItem key={`recommend-${book.id}`} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {books.map((book)=>(
          <BookItem key={`all-${book.id}`} {...book} />
        ))}
      </section>
    </div>
  );
}