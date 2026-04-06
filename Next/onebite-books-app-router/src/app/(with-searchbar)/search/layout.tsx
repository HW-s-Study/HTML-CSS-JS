import { ReactNode } from "react";

export default function Layout({ children }:{ children : ReactNode }) {
    return (
        <div>
            <header />
            <main>{children}</main>
            <footer />
        </div>
    );
}