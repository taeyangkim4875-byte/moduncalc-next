'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface CalcItem { href: string; icon: string; title: string; desc: string; }

const RELATED: Record<string, CalcItem[]> = {
  '/savings/doyak': [
    { href: '/savings/mirae', icon: '🏦', title: '청년미래적금', desc: '은행별 우대금리 비교' },
    { href: '/salary', icon: '💰', title: '연봉 상위%', desc: '내 소득 순위 확인' },
  ],
  '/savings/mirae': [
    { href: '/savings/doyak', icon: '🏦', title: '청년도약계좌', desc: '5년 만기 실수령액' },
    { href: '/salary/table', icon: '📋', title: '실수령액 표', desc: '연봉별 세후 월급' },
  ],
  '/salary': [
    { href: '/salary/table', icon: '📋', title: '실수령액 표', desc: '연봉별 한눈에' },
    { href: '/salary/minimum', icon: '💰', title: '최저시급', desc: '주휴수당·월급' },
    { href: '/tax/income', icon: '🧾', title: '종합소득세', desc: '누진세율 계산' },
  ],
  '/salary/table': [
    { href: '/salary', icon: '💰', title: '연봉 상위%', desc: '내 순위 확인' },
    { href: '/salary/minimum', icon: '💰', title: '최저시급', desc: '주휴수당·월급' },
  ],
  '/salary/minimum': [
    { href: '/salary', icon: '💰', title: '연봉 상위%', desc: '내 소득 순위' },
    { href: '/salary/severance', icon: '💰', title: '퇴직금', desc: '예상 퇴직금' },
  ],
  '/salary/severance': [
    { href: '/pension/jobless', icon: '👵', title: '실업급여', desc: '구직급여 예상액' },
    { href: '/salary/annual', icon: '📅', title: '연차 계산기', desc: '연차 일수' },
  ],
  '/salary/parental': [
    { href: '/salary/annual', icon: '📅', title: '연차 계산기', desc: '연차 일수' },
    { href: '/salary/severance', icon: '💰', title: '퇴직금', desc: '예상 퇴직금' },
  ],
  '/salary/annual': [
    { href: '/salary/severance', icon: '💰', title: '퇴직금', desc: '예상 퇴직금' },
    { href: '/salary/minimum', icon: '💰', title: '최저시급', desc: '주휴수당' },
  ],
  '/pension/jobless': [
    { href: '/pension/nps', icon: '👵', title: '국민연금', desc: '예상 수령액' },
    { href: '/salary/severance', icon: '💰', title: '퇴직금', desc: '예상 퇴직금' },
  ],
  '/pension/nps': [
    { href: '/pension/jobless', icon: '👵', title: '실업급여', desc: '구직급여 계산' },
    { href: '/salary', icon: '💰', title: '연봉 상위%', desc: '내 소득 순위' },
  ],
  '/loan': [
    { href: '/loan/car', icon: '🚗', title: '자동차 할부', desc: '월 납입액·취등록세' },
    { href: '/realestate/acqtax', icon: '🏢', title: '취득세', desc: '주택 매매 세금' },
  ],
  '/loan/car': [
    { href: '/loan', icon: '🏠', title: '대출 이자', desc: '원리금·원금균등' },
    { href: '/realestate/commission', icon: '🏢', title: '복비', desc: '중개수수료' },
  ],
  '/health/bmi': [
    { href: '/health/bmr', icon: '💪', title: '기초대사량', desc: '일일 칼로리' },
  ],
  '/health/bmr': [
    { href: '/health/bmi', icon: '💪', title: 'BMI', desc: '체질량지수' },
  ],
  '/realestate/acqtax': [
    { href: '/realestate/commission', icon: '🏢', title: '복비', desc: '중개수수료' },
    { href: '/realestate/transfer', icon: '🏢', title: '양도소득세', desc: '양도세' },
    { href: '/loan', icon: '🏠', title: '대출 이자', desc: '주담대 계산' },
  ],
  '/realestate/commission': [
    { href: '/realestate/acqtax', icon: '🏢', title: '취득세', desc: '매매 세금' },
    { href: '/realestate/convert', icon: '🏢', title: '전월세 전환', desc: '전세↔월세' },
  ],
  '/realestate/convert': [
    { href: '/realestate/commission', icon: '🏢', title: '복비', desc: '중개수수료' },
    { href: '/realestate/acqtax', icon: '🏢', title: '취득세', desc: '매매 세금' },
  ],
  '/realestate/transfer': [
    { href: '/realestate/acqtax', icon: '🏢', title: '취득세', desc: '매매 세금' },
    { href: '/tax/income', icon: '🧾', title: '종합소득세', desc: '누진세율' },
  ],
  '/tax/vat': [
    { href: '/tax/income', icon: '🧾', title: '종합소득세', desc: '누진세율' },
  ],
  '/tax/income': [
    { href: '/tax/vat', icon: '🧾', title: '부가세', desc: '공급가액 역산' },
    { href: '/salary', icon: '💰', title: '연봉 상위%', desc: '소득 순위' },
  ],
  '/daily/stock': [
    { href: '/daily/percent', icon: '📊', title: '퍼센트', desc: '비율·변화율' },
    { href: '/tax/income', icon: '🧾', title: '종합소득세', desc: '양도세 참고' },
  ],
};

export default function RelatedCalcs() {
  const pathname = usePathname();
  const items = RELATED[pathname];
  if (!items || items.length === 0) return null;

  return (
    <div className="mt-4 mb-2">
      <div className="text-xs font-bold text-[var(--sub)] mb-2 px-1">📎 관련 계산기</div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {items.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className="flex-none flex items-center gap-2 px-3 py-2.5 bg-white rounded-xl border border-[var(--line)] shadow-sm no-underline text-[var(--ink)] hover:border-[var(--primary)] hover:shadow-md transition-all min-w-[140px]"
          >
            <span className="text-lg">{item.icon}</span>
            <div>
              <div className="text-xs font-bold">{item.title}</div>
              <div className="text-[10px] text-[var(--sub)]">{item.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
