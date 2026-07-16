'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const SUGGESTIONS: Record<string, string[]> = {
  '/salary': ['비과세 식대가 뭐예요?', '부양가족 등록하면 얼마나 절세돼요?', '연말정산 환급 많이 받는 법?'],
  '/salary/minimum': ['주휴수당이 뭐예요?', '수습기간에도 최저임금 받나요?', '알바 4대보험 의무인가요?'],
  '/salary/severance': ['1년 미만이면 퇴직금 못 받나요?', '퇴직금에 세금이 얼마나 붙나요?', '퇴직금 중간정산 가능한가요?'],
  '/savings/doyak': ['변동금리로 바뀌면 손해인가요?', '미래적금으로 환승하는 게 나을까요?', '우대금리 소급 적용되나요?'],
  '/savings/mirae': ['어떤 은행이 가장 유리해요?', '우대금리 조건 못 채우면 어떻게 돼요?', '도약계좌에서 갈아타야 하나요?'],
  '/loan': ['원리금균등과 원금균등 뭐가 유리해요?', '거치기간이 뭐예요?', '대출 중도상환하면 수수료 있나요?'],
  '/loan/dsr': ['DSR 40% 넘으면 대출 못 받나요?', 'DSR 낮추는 방법이 있나요?', '신용대출도 DSR에 포함되나요?'],
  '/tax/income': ['종합소득세 신고 안 하면 어떻게 돼요?', '프리랜서 3.3% 원천징수가 뭐예요?', '인적공제 조건이 뭐예요?'],
  '/pension/nps': ['국민연금 조기 수령 가능한가요?', '국민연금 안 내면 어떻게 돼요?', '납부 예외 신청은 어떻게 하나요?'],
  '/pension/jobless': ['자발적 퇴사도 실업급여 받을 수 있나요?', '실업급여 얼마나 오래 받나요?', '알바도 실업급여 대상인가요?'],
  '/health/bmi': ['BMI가 높으면 어떤 운동이 좋아요?', '근육량이 많으면 BMI가 높게 나오나요?', '다이어트 시작하려면 뭐부터 해야 해요?'],
  '/daily/compound': ['연 7% 수익률이 현실적인가요?', '적금 vs ETF 뭐가 나아요?', '72의 법칙이 뭐예요?'],
  '/daily/fire': ['한국에서 FIRE 현실적인가요?', '저축률 50% 가능한가요?', '국민연금도 FIRE 자산에 포함하나요?'],
};

const DEFAULT_SUGGESTIONS = ['연말정산 환급 많이 받는 법?', '4대보험 요율이 어떻게 되나요?', '비과세 항목에 뭐가 있나요?'];

// 챗봇이 표시될 페이지들
const ENABLED_PATHS = [
  '/salary', '/salary/table', '/salary/minimum', '/salary/severance', '/salary/live',
  '/salary/convert', '/salary/calendar', '/salary/parental', '/salary/annual', '/salary/lifetime',
  '/savings/doyak', '/savings/mirae', '/savings/interest',
  '/loan', '/loan/dsr', '/loan/car',
  '/pension/jobless', '/pension/nps',
  '/tax/vat', '/tax/income', '/tax/gift', '/tax/inherit',
  '/realestate/acqtax', '/realestate/convert', '/realestate/commission', '/realestate/transfer',
  '/realestate/subscription', '/realestate/registration',
  '/daily/compound', '/daily/fire', '/daily/stock', '/daily/crypto',
  '/health/bmi', '/health/bmr', '/health/bodyfat', '/daily/calorie',
];

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  const suggestions = SUGGESTIONS[pathname] || DEFAULT_SUGGESTIONS;
  const enabled = ENABLED_PATHS.includes(pathname);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Hook 이후에 조건부 return
  if (!enabled) return null;

  const ask = async (question: string) => {
    if (!question.trim() || loading) return;

    const q = question.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: q }]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, context: pathname }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessages(prev => [...prev, { role: 'ai', text: data.answer }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: err instanceof Error ? err.message : '오류가 발생했습니다. 다시 시도해주세요.' }]);
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-[90] w-14 h-14 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--violet)] text-white text-2xl border-0 cursor-pointer shadow-lg hover:scale-105 transition-transform flex items-center justify-center lg:right-8"
        aria-label="AI 상담"
      >
        💬
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-[90] w-[340px] max-h-[500px] bg-white rounded-2xl shadow-2xl border border-[var(--line)] flex flex-col overflow-hidden lg:right-8">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[var(--primary)] to-[var(--violet)] text-white">
        <div className="flex items-center gap-2">
          <span className="text-lg">🤖</span>
          <div>
            <div className="text-sm font-bold">AI 재무 상담</div>
            <div className="text-[10px] opacity-80">세금·연봉·적금 뭐든 물어보세요</div>
          </div>
        </div>
        <button onClick={() => setOpen(false)} className="text-white text-lg bg-transparent border-0 cursor-pointer hover:opacity-70">✕</button>
      </div>

      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2.5 min-h-[200px] max-h-[320px]">
        {messages.length === 0 && (
          <div className="text-center py-4">
            <div className="text-2xl mb-2">💬</div>
            <div className="text-xs text-[var(--sub)] mb-3">궁금한 점을 물어보세요!</div>
            <div className="flex flex-col gap-1.5">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => ask(s)}
                  className="text-left px-3 py-2 bg-[var(--bg)] rounded-xl text-xs text-[var(--ink)] font-medium border-0 cursor-pointer hover:bg-[var(--primary-weak)] transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-[13px] leading-relaxed ${
              msg.role === 'user'
                ? 'bg-[var(--primary)] text-white rounded-br-sm'
                : 'bg-[var(--bg)] text-[var(--ink)] rounded-bl-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-[var(--bg)] px-4 py-2.5 rounded-2xl rounded-bl-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-[var(--sub)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-[var(--sub)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-[var(--sub)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 입력 영역 */}
      <div className="p-3 border-t border-[var(--line)]">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') ask(input); }}
            placeholder="질문을 입력하세요..."
            disabled={loading}
            className="flex-1 py-2.5 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-sm outline-none focus:border-[var(--primary)] disabled:opacity-50"
          />
          <button
            onClick={() => ask(input)}
            disabled={loading || !input.trim()}
            className="px-3 py-2.5 bg-[var(--primary)] text-white text-sm font-bold rounded-xl border-0 cursor-pointer disabled:opacity-50 hover:bg-[var(--primary-dark)]"
          >
            전송
          </button>
        </div>
        <div className="text-[9px] text-[var(--sub)] text-center mt-1.5">AI 답변은 참고용입니다 · NVIDIA AI</div>
      </div>
    </div>
  );
}
