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
 * 정책 문서는 한국어(/privacy 등)와 영문(/en/privacy 등)을 따로 발행합니다.
 * 영문 페이지에서는 영문판을 가리킵니다. 양쪽 내용이 같아야 하므로 한쪽을
 * 고치면 다른 쪽도 함께 고칠 것.
 *
 * 변경 이력(changelog)만 한국어 단일 발행이라 그 점을 한 줄로 알립니다.
 */
export default function SiteFooter() {
  const isEn = isEnPath(usePathname());

  const links = isEn
    ? [
        { href: '/en', label: 'All calculators' },
        { href: '/en/guide', label: 'Guides' },
        { href: '/en/about', label: 'About' },
        { href: '/en/contact', label: 'Contact' },
        { href: '/en/privacy', label: 'Privacy' },
        { href: '/en/terms', label: 'Terms' },
        { href: '/en/disclaimer', label: 'Disclaimer' },
        { href: '/changelog', label: 'Changelog' },
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
          The changelog is published in Korean only.
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
