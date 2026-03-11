import {useRouter} from "next/router";

export default function Page() {
  const router = useRouter();
  return (
    <div>
      <h1>검색 : {router.query.q}</h1>    
    </div>
    // q는 변수명으로 검색어를 담을 변수 /search?q=검색어 형태로 요청이 들어오면 q에 검색어가 담긴다
  );
}