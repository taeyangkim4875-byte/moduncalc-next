'use client';

import { useEffect } from 'react';

/**
 * 루트 레이아웃이 <html lang="ko"> 로 고정되어 있어서,
 * 영문 페이지에서는 문서 언어를 en 으로 바꿔줍니다.
 * 스크린리더의 발음 선택과 브라우저 번역 제안이 이 값을 따릅니다.
 */
export default function HtmlLangEn() {
  useEffect(() => {
    const el = document.documentElement;
    const prev = el.lang;
    el.lang = 'en';
    return () => {
      el.lang = prev || 'ko';
    };
  }, []);
  return null;
}
