import { ReactNode } from "react";

export default function Layout({ children }:{ children : ReactNode }) {
    return (
        <div>
            <div>설정 페이지 전용 헤더</div>
            {children}
        </div>
    );
}