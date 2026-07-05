'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface CalcItem {
  name: string;
  keywords: string[];
  href: string;
  icon: string;
  category: string;
}

const CALCULATORS: CalcItem[] = [
  { name: '스마트 계산기', keywords: ['스마트', '수식', 'cos', 'sin', 'sqrt', '공학', '함수'], href: '/calc', icon: '🧮', category: '계산기' },
  { name: '청년도약계좌 계산기', keywords: ['도약', '도약계좌', '청년도약', '적금', '5년'], href: '/savings/doyak', icon: '🏦', category: '적금' },
  { name: '청년미래적금 계산기', keywords: ['미래', '미래적금', '청년미래', '환승', '3년', '은행별'], href: '/savings/mirae', icon: '🏦', category: '적금' },
  { name: '연봉 상위%', keywords: ['연봉', '상위', '퍼센트', '백분위', '급여', '소득'], href: '/salary', icon: '💰', category: '연봉' },
  { name: '연봉 실수령액 표', keywords: ['실수령액', '표', '연봉', '세후', '월급', '공제'], href: '/salary/table', icon: '📋', category: '연봉' },
  { name: '최저시급 계산기', keywords: ['최저시급', '최저임금', '시급', '주휴수당', '알바', '아르바이트'], href: '/salary/minimum', icon: '💰', category: '연봉' },
  { name: '실업급여 계산기', keywords: ['실업급여', '구직급여', '퇴사', '고용보험', '실직'], href: '/pension/jobless', icon: '👵', category: '연금/보험' },
  { name: '국민연금 계산기', keywords: ['국민연금', '연금', '노후', '수령액', '가입기간'], href: '/pension/nps', icon: '👵', category: '연금/보험' },
  { name: '퇴직금 계산기', keywords: ['퇴직금', '퇴직', '퇴사', '재직기간', '평균임금'], href: '/salary/severance', icon: '💰', category: '연봉' },
  { name: '대출 이자 계산기', keywords: ['대출', '이자', '원리금', '원금균등', '상환', '모기지', '주담대'], href: '/loan', icon: '🏠', category: '대출' },
  { name: 'BMI 계산기', keywords: ['bmi', '체질량', '비만', '체중', '키', '다이어트'], href: '/health/bmi', icon: '💪', category: '건강' },
  { name: '기초대사량 계산기', keywords: ['기초대사량', 'bmr', '칼로리', 'tdee', '다이어트', '대사'], href: '/health/bmr', icon: '💪', category: '건강' },
  { name: '퍼센트 계산기', keywords: ['퍼센트', '%', '비율', '변화율', '할인율'], href: '/daily/percent', icon: '📊', category: '일상' },
  { name: '할인가 계산기', keywords: ['할인', '세일', '1+1', '단가', '가격'], href: '/daily/discount', icon: '🏷️', category: '일상' },
  { name: '더치페이 계산기', keywords: ['더치페이', 'n분의1', '나누기', '팁', '모임'], href: '/daily/dutch', icon: '🍽️', category: '일상' },
  { name: 'D-day 계산기', keywords: ['디데이', 'd-day', '날짜', '기념일', '남은날'], href: '/daily/dday', icon: '📅', category: '일상' },
  { name: '나이 계산기', keywords: ['나이', '만나이', '한국나이', '띠', '별자리', '생년월일'], href: '/daily/age', icon: '🎂', category: '일상' },
  { name: '단위 변환기', keywords: ['단위', '변환', '길이', '무게', '온도', '면적', '평', 'cm', 'kg'], href: '/daily/unit', icon: '📏', category: '일상' },
  { name: '속도·시간 계산기', keywords: ['속도', '시간', '거리', 'km', '소요시간'], href: '/daily/speed', icon: '🚗', category: '일상' },
  { name: '연비 계산기', keywords: ['연비', '주유', '기름값', '유류비', '자동차'], href: '/daily/fuel', icon: '⛽', category: '일상' },
  { name: '취득세 계산기', keywords: ['취득세', '부동산', '매매', '아파트', '주택', '세금'], href: '/realestate/acqtax', icon: '🏢', category: '부동산' },
  { name: '전월세 전환 계산기', keywords: ['전월세', '전세', '월세', '전환율', '보증금'], href: '/realestate/convert', icon: '🏢', category: '부동산' },
  { name: '복비 계산기', keywords: ['복비', '중개수수료', '중개보수', '부동산', '매매', '전세'], href: '/realestate/commission', icon: '🏢', category: '부동산' },
  { name: '양도소득세 계산기', keywords: ['양도세', '양도소득세', '부동산', '매매', '차익'], href: '/realestate/transfer', icon: '🏢', category: '부동산' },
  { name: '학점 계산기', keywords: ['학점', 'gpa', '평점', '대학', '성적', '평균'], href: '/daily/gpa', icon: '🎓', category: '일상' },
  { name: '부가세 계산기', keywords: ['부가세', 'vat', '부가가치세', '공급가액', '세금계산서'], href: '/tax/vat', icon: '🧾', category: '세금' },
  { name: '종합소득세 계산기', keywords: ['종합소득세', '종소세', '소득세', '누진세', '세율', '프리랜서'], href: '/tax/income', icon: '🧾', category: '세금' },
  { name: '손글씨 계산기', keywords: ['손글씨', '필기', '그리기', '터치', 'ai', '인식'], href: '/handwriting', icon: '✏️', category: '계산기' },
];

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const filtered = query.trim()
    ? CALCULATORS.filter(c => {
        const q = query.toLowerCase();
        return c.name.toLowerCase().includes(q) ||
               c.keywords.some(k => k.toLowerCase().includes(q)) ||
               c.category.toLowerCase().includes(q);
      })
    : [];

  const showResults = focused && (query.trim().length > 0);

  // 키보드 네비게이션
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0 && filtered[selectedIndex]) {
      e.preventDefault();
      navigateTo(filtered[selectedIndex].href);
    } else if (e.key === 'Escape') {
      setFocused(false);
      inputRef.current?.blur();
    }
  };

  const navigateTo = (href: string) => {
    setQuery('');
    setFocused(false);
    setSelectedIndex(-1);
    router.push(href);
  };

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(e.target as Node) &&
          inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => { setSelectedIndex(-1); }, [query]);

  return (
    <div className="relative mb-4">
      {/* 검색 입력 */}
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--sub)] text-base pointer-events-none">🔍</span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder="계산기 검색 (예: 연봉, BMI, 대출)"
          className="w-full py-3 pl-10 pr-4 border-[1.5px] border-[var(--line)] rounded-2xl text-sm font-semibold text-[var(--ink)] outline-none bg-white focus:border-[var(--primary)] transition-colors placeholder:text-[var(--sub)] placeholder:font-medium"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); inputRef.current?.focus(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--sub)] text-sm cursor-pointer bg-transparent border-0 hover:text-[var(--ink)]"
          >✕</button>
        )}
      </div>

      {/* 검색 결과 드롭다운 */}
      {showResults && (
        <div
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-lg border border-[var(--line)] z-[100] max-h-[360px] overflow-y-auto"
        >
          {filtered.length > 0 ? (
            <div className="p-2">
              {filtered.map((item, i) => (
                <button
                  key={item.href}
                  onClick={() => navigateTo(item.href)}
                  onMouseEnter={() => setSelectedIndex(i)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left cursor-pointer border-0 transition-colors ${
                    selectedIndex === i ? 'bg-[var(--primary-weak)]' : 'bg-transparent hover:bg-[var(--bg)]'
                  }`}
                >
                  <span className="text-xl w-8 text-center flex-none">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-[var(--ink)] truncate">{item.name}</div>
                    <div className="text-[11px] text-[var(--sub)] font-medium">{item.category}</div>
                  </div>
                  <span className="text-xs text-[var(--sub)] flex-none">→</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-sm text-[var(--sub)]">
              <span className="text-2xl block mb-2">🔍</span>
              &quot;{query}&quot;에 해당하는 계산기가 없어요
            </div>
          )}
        </div>
      )}
    </div>
  );
}
