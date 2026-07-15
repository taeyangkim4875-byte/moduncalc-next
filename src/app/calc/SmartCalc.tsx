'use client';

import { useState, useCallback } from 'react';
import Card, { SectionTitle } from '@/components/Card';

// 한국어 → 수식 변환 맵
const KO_MAP: [RegExp, string][] = [
  [/코사인|코싸인/g, 'cos'],
  [/사인/g, 'sin'],
  [/탄젠트/g, 'tan'],
  [/루트|제곱근/g, 'sqrt'],
  [/로그/g, 'log'],
  [/파이/g, 'PI'],
  [/더하기|플러스/g, '+'],
  [/빼기|마이너스/g, '-'],
  [/곱하기/g, '*'],
  [/나누기/g, '/'],
  [/의\s*(\d+)\s*제곱/g, '**$1'],
  [/제곱/g, '**2'],
];

function parseExpression(input: string): string {
  let expr = input.trim();

  // 한국어 변환
  for (const [pattern, replacement] of KO_MAP) {
    expr = expr.replace(pattern, replacement);
  }

  // 수학 함수 매핑
  expr = expr
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/\^/g, '**')
    .replace(/π/g, 'Math.PI')
    .replace(/PI/g, 'Math.PI')
    .replace(/\be\b/g, 'Math.E')
    .replace(/cos\(/g, 'Math.cos(')
    .replace(/sin\(/g, 'Math.sin(')
    .replace(/tan\(/g, 'Math.tan(')
    .replace(/sqrt\(/g, 'Math.sqrt(')
    .replace(/log\(/g, 'Math.log10(')
    .replace(/ln\(/g, 'Math.log(')
    .replace(/abs\(/g, 'Math.abs(')
    .replace(/ceil\(/g, 'Math.ceil(')
    .replace(/floor\(/g, 'Math.floor(')
    .replace(/round\(/g, 'Math.round(')
    .replace(/pow\(/g, 'Math.pow(')
    // 함수 뒤에 괄호 없으면 자동 추가: cos 45 → cos(45)
    .replace(/(Math\.\w+)\s+(\d+)/g, '$1($2)')
    // 각도 → 라디안 변환 (삼각함수)
    .replace(/Math\.(cos|sin|tan)\(([^)]+)\)/g, (_, fn, arg) => {
      return `Math.${fn}((${arg})*Math.PI/180)`;
    });

  return expr;
}

function safeEval(expr: string): { value: number | null; error: string | null } {
  try {
    // 허용 문자 체크 (숫자, 연산자, Math 함수, 괄호, 공백, 소수점)
    const sanitized = expr.replace(/Math\.\w+/g, '').replace(/[0-9+\-*/.()%\s]/g, '');
    if (sanitized.length > 0 && !/^\*+$/.test(sanitized)) {
      return { value: null, error: '허용되지 않는 문자가 포함되어 있어요' };
    }
    const result = Function('"use strict"; return (' + expr + ')')();
    if (typeof result !== 'number' || !isFinite(result)) {
      return { value: null, error: '계산할 수 없는 수식이에요' };
    }
    return { value: result, error: null };
  } catch {
    return { value: null, error: null }; // 수식 미완성 (입력 중)
  }
}

function formatResult(n: number): string {
  if (Number.isInteger(n)) return n.toLocaleString('ko-KR');
  const str = parseFloat(n.toFixed(10)).toString();
  const parts = str.split('.');
  return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (parts[1] ? '.' + parts[1] : '');
}

export default function SmartCalc() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ expr: string; result: string }[]>([]);

  const parsed = input ? parseExpression(input) : '';
  const { value, error } = input ? safeEval(parsed) : { value: null, error: null };

  const addToHistory = useCallback(() => {
    if (value !== null) {
      setHistory(prev => [{ expr: input, result: formatResult(value) }, ...prev.slice(0, 19)]);
      setInput('');
    }
  }, [input, value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') addToHistory();
  };

  const appendToInput = (str: string) => {
    setInput(prev => prev + str);
  };

  // 계산기 버튼 배열
  const buttons = [
    ['C', '(', ')', '⌫'],
    ['sin(', 'cos(', 'tan(', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', 'π', '='],
    ['sqrt(', 'log(', '^', '%'],
  ];

  const handleButton = (btn: string) => {
    if (btn === 'C') { setInput(''); return; }
    if (btn === '⌫') { setInput(prev => prev.slice(0, -1)); return; }
    if (btn === '=') { addToHistory(); return; }
    if (btn === '×') { appendToInput('*'); return; }
    if (btn === '÷') { appendToInput('/'); return; }
    appendToInput(btn);
  };

  return (
    <>
      {/* 입력 영역 */}
      <Card className="!pb-3">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="수식 입력 (예: cos(45), 루트 16, 2^10)"
            className="w-full py-4 px-4 border-2 border-[var(--line)] rounded-2xl text-xl font-bold text-[var(--ink)] outline-none focus:border-[var(--primary)] bg-white transition-colors"
            autoFocus
          />
        </div>

        {/* 실시간 결과 (높이 완전 고정) */}
        <div className="mt-3 rounded-xl p-4 h-[72px] flex items-center justify-end overflow-hidden" style={{ background: value !== null ? 'var(--primary-weak)' : error ? '#FFF4E5' : 'var(--bg)' }}>
          {value !== null ? (
            <div className="text-[28px] font-extrabold text-[var(--primary-dark)] tracking-tight truncate">= {formatResult(value)}</div>
          ) : error ? (
            <div className="text-sm font-semibold text-[#B26A00]">{error}</div>
          ) : input ? (
            <div className="text-sm text-[var(--sub)] font-medium">입력 중...</div>
          ) : (
            <div className="text-sm text-[var(--sub)]">수식을 입력하면 실시간으로 계산돼요</div>
          )}
        </div>
      </Card>

      {/* 버튼 계산기 */}
      <Card className="!p-3">
        <div className="grid grid-cols-4 gap-1.5">
          {buttons.flat().map((btn, i) => {
            const isOp = ['÷', '×', '-', '+', '=', '^', '%'].includes(btn);
            const isFunc = ['sin(', 'cos(', 'tan(', 'sqrt(', 'log('].includes(btn);
            const isSpecial = ['C', '⌫'].includes(btn);
            const isEqual = btn === '=';

            return (
              <button
                key={i}
                onClick={() => handleButton(btn)}
                className={`py-3 rounded-xl text-sm font-bold cursor-pointer border-0 transition-all active:scale-95 ${
                  isEqual ? 'bg-[var(--primary)] text-white' :
                  isSpecial ? 'bg-[#FFE5E5] text-[#E5484D]' :
                  isOp ? 'bg-[var(--primary-weak)] text-[var(--primary-dark)]' :
                  isFunc ? 'bg-[var(--violet-weak)] text-[var(--violet)]' :
                  'bg-[var(--bg)] text-[var(--ink)]'
                }`}
              >
                {btn}
              </button>
            );
          })}
        </div>
      </Card>

      {/* 지원 기능 안내 */}
      <Card>
        <SectionTitle num="💡">이렇게 입력해 보세요</SectionTitle>
        <div className="flex flex-col gap-2">
          {[
            { input: 'cos(45)', desc: '코사인 45도' },
            { input: 'sqrt(144)', desc: '144의 제곱근' },
            { input: '2^10', desc: '2의 10제곱' },
            { input: 'log(1000)', desc: '상용로그 1000' },
            { input: '루트 16', desc: '한국어로도 OK' },
            { input: '코사인 60', desc: '한국어 함수명' },
            { input: '(3+4)*5', desc: '괄호 연산' },
            { input: 'π * 2', desc: '원주율 (파이)' },
          ].map((ex, i) => (
            <button
              key={i}
              onClick={() => setInput(ex.input)}
              className="flex justify-between items-center py-2 px-3 bg-[var(--bg)] rounded-lg text-sm cursor-pointer border-0 text-left hover:bg-[var(--primary-weak)] transition-colors"
            >
              <code className="font-bold text-[var(--ink)]">{ex.input}</code>
              <span className="text-xs text-[var(--sub)]">{ex.desc}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* 지원 함수 표 */}
      <Card>
        <SectionTitle num="📚">지원 함수 목록</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[12.5px]">
            <thead><tr className="border-b-2 border-[var(--line)]"><th className="py-1.5 text-left text-[var(--sub)] font-bold">함수</th><th className="py-1.5 text-left text-[var(--sub)] font-bold">사용법</th><th className="py-1.5 text-left text-[var(--sub)] font-bold">한국어</th><th className="py-1.5 text-right text-[var(--sub)] font-bold">예시 결과</th></tr></thead>
            <tbody>
              {[
                ['sin', 'sin(30)', '사인', '0.5'],
                ['cos', 'cos(60)', '코사인', '0.5'],
                ['tan', 'tan(45)', '탄젠트', '1'],
                ['sqrt', 'sqrt(144)', '루트, 제곱근', '12'],
                ['log', 'log(1000)', '로그', '3'],
                ['ln', 'ln(e)', '-', '1'],
                ['abs', 'abs(-5)', '-', '5'],
                ['^', '2^10', '제곱', '1,024'],
                ['π', 'π * 2', '파이', '6.2832'],
                ['%', '50 % 3', '-', '2'],
              ].map(([fn, usage, ko, result]) => (
                <tr key={fn} className="border-b border-[var(--line)]">
                  <td className="py-1.5 font-bold text-[var(--primary-dark)]">{fn}</td>
                  <td className="py-1.5"><code className="bg-[var(--bg)] px-1 rounded text-[11px]">{usage}</code></td>
                  <td className="py-1.5 text-[var(--sub)]">{ko}</td>
                  <td className="py-1.5 text-right font-bold">{result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 히스토리 */}
      {history.length > 0 && (
        <Card>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[13px] font-extrabold">📋 계산 기록</span>
            <button onClick={() => setHistory([])} className="text-xs text-[var(--sub)] font-semibold cursor-pointer border-0 bg-transparent hover:text-[var(--ink)]">지우기</button>
          </div>
          <div className="flex flex-col gap-1.5">
            {history.map((h, i) => (
              <button
                key={i}
                onClick={() => setInput(h.expr)}
                className="flex justify-between items-center py-2 px-2.5 bg-[var(--bg)] rounded-lg text-sm cursor-pointer border-0 text-left hover:bg-[var(--primary-weak)] transition-colors"
              >
                <span className="text-[var(--sub)] font-semibold">{h.expr}</span>
                <span className="font-extrabold text-[var(--primary-dark)]">= {h.result}</span>
              </button>
            ))}
          </div>
        </Card>
      )}
      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 스마트 계산기란?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">스마트 계산기는 일반 사칙연산은 물론 <b>삼각함수, 로그, 제곱근, 거듭제곱</b> 등 공학 계산을 지원하는 무료 온라인 계산기입니다. 버튼을 누르거나 수식을 직접 타이핑할 수 있으며, <b>한국어로도 입력</b>할 수 있는 것이 특징입니다.</p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3"><b>실시간 계산:</b> 수식을 입력하는 즉시 결과가 표시됩니다. Enter 키를 누르면 계산 기록에 저장되어 이전 계산을 다시 불러올 수 있습니다.</p>
        <p className="text-sm text-[#4E5968] leading-relaxed"><b>각도 기준:</b> 삼각함수(sin, cos, tan)는 도(degree) 기준입니다. cos(90)은 90도의 코사인으로 0을 반환합니다. 라디안이 필요하면 직접 변환하세요 (라디안 = 도 × π / 180).</p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 어떤 함수를 지원하나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 삼각함수(sin, cos, tan), 제곱근(sqrt), 상용로그(log), 자연로그(ln), 절대값(abs), 반올림(round), 올림(ceil), 내림(floor), 거듭제곱(^), 원주율(π), 자연상수(e), 나머지(%) 등을 지원합니다.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 한국어로 어떻게 입력하나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. &apos;루트 16&apos;, &apos;코사인 45&apos;, &apos;사인 30&apos;, &apos;탄젠트 45&apos;, &apos;파이&apos;, &apos;더하기&apos;, &apos;빼기&apos;, &apos;곱하기&apos;, &apos;나누기&apos; 등을 입력하면 자동으로 수식으로 변환됩니다.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 계산 기록은 저장되나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 현재 세션 동안만 저장됩니다. 페이지를 닫으면 기록이 초기화됩니다. 모든 계산은 브라우저에서 처리되며 서버로 전송되지 않습니다.</div></div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">모든 계산은 브라우저에서 즉시 처리되며, 입력한 수식은 서버로 전송되지 않습니다.</div>
      </footer>
    </>
  );
}
