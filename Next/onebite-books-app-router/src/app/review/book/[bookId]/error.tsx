"use client";

import { useRouter } from "next/navigation";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ReviewError({ error, reset }: Props) {
  const router = useRouter();
  console.error(error);

  return (
    <div>
      <h3>오류가 발생했습니다</h3>
      <p>{error.message}</p>
      <button onClick={() => reset()}>다시 시도</button>
      <button onClick={() => router.push("/")}>홈으로</button>
    </div>
  );
}
