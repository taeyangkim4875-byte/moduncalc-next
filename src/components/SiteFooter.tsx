'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CURRENT_YEAR } from '@/data/constants';
import { isEnPath } from '@/utils/locale';

/**
 * 모든 페이지 맨 아래 정책 링크 묶음.
 *
 * PageLayout 은 서버 컴포넌트라 경로를 읽을 수 없어서, 언어가 갈리는
 * 이 부분만 클라이언트 컴포넌트로 떼어냈습니다.
 *
 * 정책 문서(소개·개인정보·약관·면책) 본문은 한국어로만 발행합니다.
 * 영문 페이지에서는 링크 이름만 영어로 보여주고, 본문이 한국어라는 점을
 * 숨기지 않고 한 줄로 알립니다.
 */
export default function SiteFooter() {
  const isEn = isEnPath(usePathname());

  const links = isEn
    ? [
        { href: '/en', label: 'All calculators' },
        { href: '/en/guide', label: 'Guides' },
        { href: '/about', label: 'About' },
        { href: '/changelog', label: 'Changelog' },
        { href: '/contact', label: 'Contact' },
        { href: '/privacy', label: 'Privacy' },
        { href: '/terms', label: 'Terms' },
        { href: '/disclaimer', label: 'Disclaimer' },
      ]
    : [
        { href: '/about', label: '소개' },
        { href: '/changelog', label: '변경 이력' },
        { href: '/contact', label: '문의하기' },
        { href: '/privacy', label: '개인정보처리방침' },
        { href: '/terms', label: '이용약관' },
        { href: '/disclaimer', label: '면책조항' },
      ];

  return (
    <footer className="mt-8 pt-6 border-t border-[var(--line)] text-center text-xs text-[var(--sub)]">
      <nav className="flex flex-wrap justify-center gap-x-3 gap-y-1 mb-3">
        {links.map(l => (
          <Link key={l.href} href={l.href} className="text-[var(--sub)] no-underline hover:text-[var(--ink)]">
            {l.label}
          </Link>
        ))}
      </nav>
      {isEn && (
        <p className="mt-0 mb-2 text-[11px] text-[var(--sub)]">
          About, Privacy, Terms and Disclaimer are published in Korean.
        </p>
      )}
      <p className="m-0">
        {isEn
          ? `© ${CURRENT_YEAR} moduncalc.com · Taeyang Kim`
          : `© ${CURRENT_YEAR} 모든 계산기(moduncalc.com) · 김태양`}
      </p>
    </footer>
  );
}
