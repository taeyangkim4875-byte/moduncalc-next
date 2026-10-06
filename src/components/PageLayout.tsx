import Link from 'next/link';
import SearchBar from './SearchBar';
import RelatedCalcs from './RelatedCalcs';
import RelatedGuides from './RelatedGuides';
import FirstSaveNotice from './FirstSaveNotice';
import PageMeta from './PageMeta';

interface PageLayoutProps {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function PageLayout({ eyebrow, title, description, children }: PageLayoutProps) {
  return (
    <div className="max-w-[560px] mx-auto px-4 py-5">
      <SearchBar />
      <header className="px-1 pb-5">
        <div className="text-[13px] font-bold text-[var(--primary)] tracking-wide">{eyebrow}</div>
        <h1 className="mt-1.5 mb-2 text-2xl font-extrabold leading-tight tracking-tight">{title}</h1>
        <p className="m-0 text-sm text-[var(--sub)]">{description}</p>
      </header>
      {children}
      <RelatedGuides />
      <RelatedCalcs />
      <FirstSaveNotice />
      <PageMeta />
      <footer className="mt-8 pt-6 border-t border-[var(--line)] text-center text-xs text-[var(--sub)]">
        <nav className="flex flex-wrap justify-center gap-x-3 gap-y-1 mb-3">
          <Link href="/about" className="text-[var(--sub)] no-underline hover:text-[var(--ink)]">소개</Link>
          <Link href="/changelog" className="text-[var(--sub)] no-underline hover:text-[var(--ink)]">변경 이력</Link>
          <Link href="/contact" className="text-[var(--sub)] no-underline hover:text-[var(--ink)]">문의하기</Link>
          <Link href="/privacy" className="text-[var(--sub)] no-underline hover:text-[var(--ink)]">개인정보처리방침</Link>
          <Link href="/terms" className="text-[var(--sub)] no-underline hover:text-[var(--ink)]">이용약관</Link>
          <Link href="/disclaimer" className="text-[var(--sub)] no-underline hover:text-[var(--ink)]">면책조항</Link>
        </nav>
        <p className="m-0">&copy; 2026 모든 계산기(moduncalc.com) · 김태양</p>
      </footer>
    </div>
  );
}
