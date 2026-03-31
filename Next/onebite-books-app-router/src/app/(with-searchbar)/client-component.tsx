"use client";
import { ReactNode } from "react";

export default function ClientComponent({ children }: { children: ReactNode }) {
  console.log("Client Component 실행");
  return (
    <div>{children}</div>
  );
}