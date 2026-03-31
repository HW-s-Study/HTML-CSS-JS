import style from "./page.module.css";
import mock from "@/mock/books.json";
import { BookData } from "@/types";

export default async function Page ({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const {id} = await params;
  const books: BookData[] = mock;
  const book = books.find((book) => String(book.id) === id);

  if (!book) {
    return (
      <div>책을 찾을 수 없습니다</div>
    );
  }

  const { title, description, coverImgUrl, subTitle, author, publisher } = book;

  return (
    <div>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${coverImgUrl}')` }}
        >
          <img src={coverImgUrl} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>
          {author} | {publisher}
        </div>
        <div className={style.description}>{description}</div>
      </div>
    </div>
  );
}