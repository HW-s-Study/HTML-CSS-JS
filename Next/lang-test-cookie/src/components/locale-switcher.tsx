"use client";

import type { Locale } from "@/i18n/config";
import { setUserLocale, getUserLocale } from "@/i18n/locale";
import { useState, useEffect, startTransition } from "react";

export default function LocaleSwitcher(){
  const [locale, setCurrentLocale] = useState('ko');
  useEffect(()=>{
    async function getLocale(){
      const l = await getUserLocale();
      setCurrentLocale(l);
    }
    getLocale();
  },[]);

  const setLocale = (locale:Locale)=>{
    startTransition(() => {
      setUserLocale(locale);
      setCurrentLocale(locale);
    });
  }

  const colorKr = locale == 'ko' ? 'red':'black';
  const colorEn = locale == 'en' ? 'red':'black';

  return (
    <>
      <span style={{color:colorKr}} onClick={()=>setLocale('ko')}>한국어</span>
      <span style={{color:colorEn}} onClick={()=>setLocale('en')}>English</span>
    </>
  );
}