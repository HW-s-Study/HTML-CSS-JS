import Link from "next/link";
import { ReactNode } from "react";
import styles from "./global-layout.module.css";

export default function GlobalLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={styles.container}>
      <header>
        <Link href={"/"}>ONEBITE BOOKS</Link>
      </header>
      <main>{children}</main>
      <footer>@winterlood</footer>
    </div>
  );
}