'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { searchCalcs } from '@/data/calculators';
import ProfilePanel from './ProfilePanel';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const isEn = pathname.startsWith('/en');

  const filtered = query.trim()
    ? searchCalcs(query, isEn ? 'en' : 'ko')
    : [];

  const showResults = focused && (query.trim().length > 0);

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

  const [prevQuery, setPrevQuery] = useState(query);
  if (prevQuery !== query) {
    setPrevQuery(query);
    setSelectedIndex(-1);
  }

  return (
    <div className="relative mb-4">
      <div className="flex gap-2">
      <div className="relative flex-1">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--sub)] text-base pointer-events-none">🔍</span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder={isEn ? "Search calculators (e.g. salary, tax, pension)" : "계산기 검색 (예: 연봉, BMI, 대출)"}
          className="w-full py-3 pl-10 pr-4 border-[1.5px] border-[var(--line)] rounded-2xl text-sm font-semibold text-[var(--ink)] outline-none bg-white focus:border-[var(--primary)] transition-colors placeholder:text-[var(--sub)] placeholder:font-medium"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); inputRef.current?.focus(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--sub)] text-sm cursor-pointer bg-transparent border-0 hover:text-[var(--ink)]"
          >✕</button>
        )}
      </div>
      <ProfilePanel />
      </div>

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
                    <div className="text-sm font-bold text-[var(--ink)] truncate">{item.title}</div>
                    <div className="text-[11px] text-[var(--sub)] font-medium">{item.category}</div>
                  </div>
                  <span className="text-xs text-[var(--sub)] flex-none">→</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-sm text-[var(--sub)]">
              <span className="text-2xl block mb-2">🔍</span>
              {isEn ? `No calculators found for "${query}"` : `"${query}"에 해당하는 계산기가 없어요`}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
