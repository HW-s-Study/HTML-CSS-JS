import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const currentTime = new Date().toLocaleDateString();
  res.status(200).json({ currentTime }); // 타입 추론으로 인해 hello.ts와 달리 Data 타입을 명시적으로 선언하지 않아도 된다.
}