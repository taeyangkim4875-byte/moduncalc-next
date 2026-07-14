'use client';

import { useState, useMemo } from 'react';
import Card, { SectionTitle } from '@/components/Card';

// 플랫폼별 글자수 제한
const LIMITS = [
  { name: '자기소개서 (일반)', limit: 1000, unit: '자' },
  { name: '자기소개서 (삼성)', limit: 700, unit: '자' },
  { name: '자기소개서 (LG)', limit: 500, unit: '자' },
  { name: '트위터(X)', limit: 280, unit: '자' },
  { name: '인스타그램 캡션', limit: 2200, unit: '자' },
  { name: '인스타 미리보기', limit: 125, unit: '자' },
  { name: '카카오톡 메시지', limit: 10000, unit: '자' },
  { name: '네이버 블로그 제목', limit: 35, unit: '자' },
  { name: '유튜브 제목', limit: 100, unit: '자' },
  { name: '유튜브 설명', limit: 5000, unit: '자' },
  { name: '이메일 제목', limit: 60, unit: '자' },
  { name: '논문 Abstract', limit: 300, unit: '단어' },
];

export default function CharCountCalc() {
  const [text, setText] = useState('');
  const [countMode, setCountMode] = useState<'include' | 'exclude'>('include');

  const analysis = useMemo(() => {
    const charInclude = text.length;
    const charExclude = text.replace(/\s/g, '').length;
    const byteUtf8 = new Blob([text]).size;
    // EUC-KR 바이트 추정: 한글 2byte, 영문/숫자 1byte
    let byteEucKr = 0;
    for (const ch of text) {
      byteEucKr += /[가-힣ㄱ-ㅎㅏ-ㅣ]/.test(ch) ? 2 : 1;
    }
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const sentences = text ? text.split(/[.!?。]+/).filter(s => s.trim()).length : 0;
    const lines = text ? text.split('\n').length : 0;
    const paragraphs = text ? text.split(/\n\s*\n/).filter(s => s.trim()).length : 0;

    // 한글/영문/숫자/특수문자 비율
    const korean = (text.match(/[가-힣ㄱ-ㅎㅏ-ㅣ]/g) || []).length;
    const english = (text.match(/[a-zA-Z]/g) || []).length;
    const numbers = (text.match(/[0-9]/g) || []).length;
    const spaces = (text.match(/\s/g) || []).length;
    const special = charInclude - korean - english - numbers - spaces;

    // 읽기 시간 (한국어 평균 분당 500자, 영어 분당 200단어)
    const readTimeMin = Math.max(1, Math.ceil(charExclude / 500));

    // 원고지 환산 (200자 원고지)
    const manuscript200 = Math.ceil(charInclude / 200);
    const manuscript400 = Math.ceil(charInclude / 400);

    // 키워드 빈도 (2글자 이상 단어)
    const wordFreq: Record<string, number> = {};
    const allWords = text.replace(/[^가-힣a-zA-Z0-9\s]/g, '').trim().split(/\s+/).filter(w => w.length >= 2);
    for (const w of allWords) {
      const lower = w.toLowerCase();
      wordFreq[lower] = (wordFreq[lower] || 0) + 1;
    }
    const topKeywords = Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    return {
      charInclude, charExclude, byteUtf8, byteEucKr, words, sentences, lines, paragraphs,
      korean, english, numbers, spaces, special,
      readTimeMin, manuscript200, manuscript400, topKeywords,
    };
  }, [text]);

  const mainCount = countMode === 'include' ? analysis.charInclude : analysis.charExclude;

  return (
    <>
      {/* 메인 카운터 */}
      <Card className="!p-5">
        <div className="text-center mb-3">
          <div className="text-[56px] font-extrabold text-[var(--primary-dark)] tracking-tight leading-none tabular-nums">
            {mainCount.toLocaleString()}
          </div>
          <div className="flex justify-center gap-2 mt-2">
            <button onClick={() => setCountMode('include')} className={`px-3 py-1.5 rounded-lg text-xs font-bold border-[1.5px] transition-all ${countMode === 'include' ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] text-[var(--sub)]'}`}>
              공백 포함
            </button>
            <button onClick={() => setCountMode('exclude')} className={`px-3 py-1.5 rounded-lg text-xs font-bold border-[1.5px] transition-all ${countMode === 'exclude' ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] text-[var(--sub)]'}`}>
              공백 제외
            </button>
          </div>
        </div>

        {/* 상세 지표 그리드 */}
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { v: analysis.charInclude, l: '공백 포함' },
            { v: analysis.charExclude, l: '공백 제외' },
            { v: analysis.byteUtf8, l: 'UTF-8' },
            { v: analysis.byteEucKr, l: 'EUC-KR' },
            { v: analysis.words, l: '단어' },
            { v: analysis.sentences, l: '문장' },
            { v: analysis.lines, l: '줄' },
            { v: analysis.paragraphs, l: '문단' },
          ].map(s => (
            <div key={s.l} className="bg-[var(--bg)] rounded-xl p-2 text-center">
              <div className="text-[15px] font-extrabold text-[var(--ink)] tabular-nums">{s.v.toLocaleString()}</div>
              <div className="text-[9px] text-[var(--sub)] font-bold">{s.l}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* 텍스트 입력 */}
      <Card>
        <textarea
          rows={10}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="여기에 텍스트를 입력하거나 붙여넣으세요...&#10;&#10;자기소개서, 블로그 글, SNS 게시글 등의 글자수를 실시간으로 확인할 수 있습니다."
          className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-[15px] leading-relaxed outline-none focus:border-[var(--primary)] resize-y"
        />
        <div className="flex gap-2 mt-2">
          <button onClick={() => { navigator.clipboard.writeText(text); }} className="px-4 py-2 bg-[var(--primary)] text-white text-xs font-bold rounded-xl border-0 cursor-pointer hover:bg-[var(--primary-dark)]">
            복사
          </button>
          <button onClick={() => setText('')} className="px-4 py-2 bg-[var(--bg)] text-[var(--sub)] text-xs font-bold rounded-xl border border-[var(--line)] cursor-pointer">
            초기화
          </button>
          <div className="flex-1 text-right text-xs text-[var(--sub)] self-center">
            읽기 시간: 약 {analysis.readTimeMin}분 · 원고지: {analysis.manuscript200}매(200자)
          </div>
        </div>
      </Card>

      {/* 플랫폼별 글자수 체크 */}
      {analysis.charInclude > 0 && (
        <Card>
          <SectionTitle num="📱">플랫폼별 글자수 체크</SectionTitle>
          <div className="flex flex-col gap-1.5">
            {LIMITS.map(p => {
              const current = p.unit === '단어' ? analysis.words : analysis.charInclude;
              const pct = Math.min(100, (current / p.limit) * 100);
              const over = current > p.limit;
              const warn = pct >= 80 && !over;
              return (
                <div key={p.name} className="text-[12px]">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className={`font-semibold ${over ? 'text-[#E5484D]' : warn ? 'text-[#B26A00]' : 'text-[var(--ink)]'}`}>{p.name}</span>
                    <span className={`font-bold tabular-nums ${over ? 'text-[#E5484D]' : 'text-[var(--sub)]'}`}>
                      {current.toLocaleString()} / {p.limit.toLocaleString()}{p.unit} {over ? '초과 ⚠️' : ''}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[var(--bg)] rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${over ? 'bg-[#E5484D]' : warn ? 'bg-[#F59E0B]' : 'bg-[var(--primary)]'}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* 텍스트 구성 분석 */}
      {analysis.charInclude > 0 && (
        <Card>
          <SectionTitle num="📊">텍스트 구성 분석</SectionTitle>
          <div className="flex flex-col gap-1.5 text-[13px]">
            {[
              { label: '한글', count: analysis.korean, color: '#3182F6' },
              { label: '영문', count: analysis.english, color: '#10B981' },
              { label: '숫자', count: analysis.numbers, color: '#F59E0B' },
              { label: '공백', count: analysis.spaces, color: '#8B95A1' },
              { label: '특수문자', count: analysis.special, color: '#7C3AED' },
            ].map(item => {
              const pct = analysis.charInclude > 0 ? (item.count / analysis.charInclude * 100) : 0;
              return (
                <div key={item.label}>
                  <div className="flex justify-between mb-0.5">
                    <span className="font-semibold">{item.label}</span>
                    <span className="font-bold tabular-nums">{item.count.toLocaleString()}자 ({pct.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full h-2 bg-[var(--bg)] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: item.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* 키워드 빈도 TOP 10 */}
      {analysis.topKeywords.length > 0 && (
        <Card>
          <SectionTitle num="🔑">자주 사용된 키워드 TOP 10</SectionTitle>
          <div className="flex flex-col gap-1 text-[13px]">
            {analysis.topKeywords.map(([word, count], i) => (
              <div key={word} className="flex justify-between items-center bg-[var(--bg)] rounded-lg px-3 py-1.5">
                <span className="font-semibold"><span className="text-[var(--primary-dark)] mr-1.5">{i + 1}.</span>{word}</span>
                <span className="font-bold text-[var(--primary-dark)] tabular-nums">{count}회</span>
              </div>
            ))}
          </div>
          <div className="text-[10px] text-[var(--sub)] mt-2">2글자 이상 단어 기준 · 블로그 SEO 키워드 밀도 확인에 활용하세요</div>
        </Card>
      )}

      {/* 서비스별 글자수 제한 참조표 */}
      <Card>
        <SectionTitle num="📋">주요 서비스 글자수 제한</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[12.5px]">
            <thead><tr className="border-b-2 border-[var(--line)]"><th className="py-2 text-left text-[var(--sub)] font-bold">서비스</th><th className="py-2 text-right text-[var(--sub)] font-bold">제한</th><th className="py-2 text-right text-[var(--sub)] font-bold">기준</th></tr></thead>
            <tbody>
              {[
                ['카카오톡 메시지', '10,000자', '공백 포함'],
                ['트위터(X)', '280자', '공백 포함'],
                ['인스타그램 캡션', '2,200자', '공백 포함'],
                ['인스타 미리보기', '125자', '첫 줄'],
                ['인스타 해시태그', '30개', '개수'],
                ['네이버 블로그 제목', '35자', '권장'],
                ['네이버 블로그 본문', '제한 없음', '-'],
                ['티스토리 제목', '50자', '권장'],
                ['유튜브 제목', '100자', '권장 60자'],
                ['유튜브 설명', '5,000자', '공백 포함'],
                ['이메일 제목', '60자', '권장'],
                ['자기소개서 (일반)', '500~1,000자', '공백 포함'],
                ['삼성 자소서', '항목당 700자', '공백 포함'],
                ['LG 자소서', '항목당 500자', '공백 포함'],
                ['현대차 자소서', '항목당 800자', '공백 포함'],
                ['국가직 공무원 자소서', '항목당 600자', '공백 포함'],
                ['논문 Abstract', '150~300 words', '단어 수'],
                ['SMS 문자', '한글 70자', '1건 기준'],
                ['MMS 문자', '한글 2,000자', '1건 기준'],
              ].map(([s, l, note]) => (
                <tr key={s as string} className="border-b border-[var(--line)]"><td className="py-1.5 font-semibold">{s}</td><td className="py-1.5 text-right font-bold">{l}</td><td className="py-1.5 text-right text-[var(--sub)]">{note}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 글자수 세기 활용 가이드</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>자기소개서 작성:</b> 대부분 &apos;공백 포함&apos; 기준입니다. 글자수 제한의 90~100%를 채우는 것이 좋습니다. 너무 짧으면 성의 없어 보이고, 초과하면 잘립니다. 핵심 역량과 경험을 구체적 수치와 함께 기술하세요.</p>
          <p><b>블로그 SEO:</b> 구글 기준 양질의 콘텐츠는 최소 1,500자 이상이 권장됩니다. 제목은 35자 내외로 핵심 키워드를 포함하고, 키워드 밀도 분석을 활용해 자연스럽게 키워드를 배치하세요.</p>
          <p><b>SNS 게시글:</b> 트위터는 280자로 짧고 임팩트 있게, 인스타그램은 첫 125자가 미리보기에 노출되므로 핵심 메시지를 앞에 배치하세요. 해시태그는 인스타 최대 30개이지만 5~10개가 적정입니다.</p>
          <p><b>바이트 계산:</b> UTF-8 기준 한글 1자 = 3바이트, 영문 1자 = 1바이트입니다. EUC-KR은 한글 2바이트입니다. SMS/MMS, 데이터베이스 등에서 바이트 제한을 사용하는 경우 확인이 필요합니다.</p>
          <p><b>원고지 환산:</b> 200자 원고지 기준으로 환산하면 인쇄물 분량을 가늠할 수 있습니다. 일반적으로 A4 1장은 약 500~600자(공백 포함) 분량입니다.</p>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 한글은 몇 바이트인가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. UTF-8 인코딩 기준 한글 1자 = 3바이트, EUC-KR 기준 2바이트입니다. 영문/숫자는 두 인코딩 모두 1바이트입니다. 이 계산기는 UTF-8과 EUC-KR 바이트를 모두 표시합니다.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 자기소개서는 공백 포함인가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 대부분 &apos;공백 포함&apos; 기준입니다. 다만 일부 기업은 &apos;공백 제외&apos;를 사용하므로, 채용 공고의 정확한 기준을 반드시 확인하세요. 모호한 경우 공백 포함으로 맞추는 것이 안전합니다.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 키워드 밀도는 어떻게 활용하나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 블로그 SEO에서 핵심 키워드가 전체 텍스트에서 1~3% 정도 나타나면 적정합니다. 위 &apos;자주 사용된 키워드&apos; 분석을 활용해 특정 키워드가 너무 많거나 적지 않은지 확인하세요.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 읽기 시간은 어떻게 계산하나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 한국어 평균 읽기 속도인 분당 약 500자를 기준으로 추정합니다. 실제 읽기 속도는 내용 난이도, 개인 차이에 따라 달라질 수 있습니다.</div></div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">
          모든 분석은 브라우저에서 실시간으로 처리되며, 입력한 텍스트는 서버로 전송되지 않습니다.
        </div>
      </footer>
    </>
  );
}
