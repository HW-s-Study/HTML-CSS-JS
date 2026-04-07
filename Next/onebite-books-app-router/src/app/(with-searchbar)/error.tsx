"use client";

import { useRouter } from "next/navigation";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  const router = useRouter();
  console.log(error);

  return (
    <div>
      <h1>오류가 발생했습니다.</h1>
      <button
        onClick={() => {
          router.refresh();
          reset();
        }}
      >다시 시도</button>
    </div>
  );
}