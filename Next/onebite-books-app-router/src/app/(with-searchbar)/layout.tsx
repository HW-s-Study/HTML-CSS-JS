"use client";

import { ReactNode,Suspense } from "react";
import {useRouter} from "next/navigation";
import Searchbar from "../../components/searchbar";

export default function Layout({children}:{children:ReactNode}) {
  const router = useRouter();
  return(
    <div>
      <Suspense fallback={<div>...</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  )
}