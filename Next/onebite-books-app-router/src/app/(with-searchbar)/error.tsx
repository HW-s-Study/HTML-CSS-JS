"use client";

interface Props {
  error: Error & { digest?: string };
}

export default function Error({ error }: Props) {
  console.log(error);
  
  return <div>오류가 발생했습니다.</div>;
}