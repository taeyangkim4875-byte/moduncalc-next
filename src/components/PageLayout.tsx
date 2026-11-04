// slot="middle"(300x250)은 여기서 렌더하지 않습니다.
// children 뒤에 두면 SEO 본문 1,500~2,000자를 모두 지난 자리가 되어
// 뷰어빌리티가 15% 까지 떨어졌습니다(상단 320x100은 84%). eCPM 이 7.4배인
// 사각형 배너를 거기 두는 건 손해라, 트래픽 상위 페이지의 계산기 직후에
// 개별로 배치합니다.
import AdFitBanner, { AdFitLoader } from './AdFitBanner';
import SearchBar from './SearchBar';
import RelatedCalcs from './RelatedCalcs';
import RelatedGuides from './RelatedGuides';
import FirstSaveNotice from './FirstSaveNotice';
import PageMeta from './PageMeta';
import SiteFooter from './SiteFooter';

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
      <AdFitBanner slot="top" />
      {children}
      <RelatedGuides />
      <RelatedCalcs />
      <FirstSaveNotice />
      <PageMeta />
      <SiteFooter />
      {/* ins 가 모두 DOM 에 올라간 뒤 스크립트가 실행되도록 마지막에 둔다 */}
      <AdFitLoader />
    </div>
  );
}
