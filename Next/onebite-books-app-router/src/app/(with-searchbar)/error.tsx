"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  const router = useRouter();
  console.log(error);

  return (
    <div>
      <h3>오류가 발생했습니다.</h3>
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh();
            reset();
          });
        }}
      >다시 시도</button>
    </div>
  );
}