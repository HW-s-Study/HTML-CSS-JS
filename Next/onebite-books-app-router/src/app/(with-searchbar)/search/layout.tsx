import { ReactNode } from "react";

export default function Layout({ children }:{ children : ReactNode }) {
    return (
        <div>
            <header>임시 헤더</header>
            <main>{children}</main>
            <footer>임시 푸터</footer>
        </div>
    );
}