import { book, author } from "@/types";
import Link from "next/link";

export default function BookItem({id, name_kr, name, title_kr, title, }:book & author){
    return (
        <Link href={`/book/${id}`}>
            <div>
              <div>{title_kr}</div>
              <div>{name_kr} {name}</div>
            </div>
        </Link>
    )
}