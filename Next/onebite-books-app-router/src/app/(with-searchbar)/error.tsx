"use client";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  console.log(error);

  return (
    <div>
      <h1>오류가 발생했습니다.</h1>
      <button
        onClick={() => {
          window.location.reload();
        }}
      >다시 시도</button>
    </div>
  );
}