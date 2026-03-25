import { useRouter } from "next/router";
import style from "./[id].module.css";
// import books from "@/mock/books.json";
// import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import fetchOneBook from "@/lib/fetch-one-book";

export function getStaticPaths(){
  return {
    paths:[
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } }
    ],
    fallback: false,
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext
) {
  const id = context.params!.id;
  console.log(`현재 도서 아이디: ${id}`);
  const book = await fetchOneBook(Number(id));
  return { props: { book } };
}

export default function Page({
  book,
 }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>로딩 중입니다...</div>;
  }
  
  if (!book) {
    return <div>오류가 발생했습니다. 다시 시도해주세요.</div>;
  }
  // const router = useRouter();
  const {
    id,
    title,
    subTitle,
    description,
    author,
    publisher,
    coverImgUrl,
  } = book;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url(${coverImgUrl})` }}>
          <img src={coverImgUrl} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>
          {author} | {publisher}
        </div>
        <div className={style.description}>{description}</div>
    </div>
  );
}