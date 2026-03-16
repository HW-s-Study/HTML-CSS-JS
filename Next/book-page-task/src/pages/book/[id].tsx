import {useRouter} from "next/router";

export default function Page() {
  const router = useRouter();
  return (
    <div>
      <h1>{router.query.id} 도서 상세 페이지</h1>
    </div>
  );
}