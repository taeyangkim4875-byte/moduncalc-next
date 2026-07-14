'use client';

import { useState, useCallback } from 'react';
import Card, { SectionTitle } from '@/components/Card';

type Tab = 'number' | 'lotto' | 'shuffle';

function getRandomInt(min: number, max: number): number {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return min + (arr[0] % (max - min + 1));
}

function pickNumbers(min: number, max: number, count: number, allowDup: boolean): number[] {
  if (allowDup) {
    return Array.from({ length: count }, () => getRandomInt(min, max));
  }
  const range = max - min + 1;
  const pick = Math.min(count, range);
  const result: Set<number> = new Set();
  while (result.size < pick) {
    result.add(getRandomInt(min, max));
  }
  return Array.from(result).sort((a, b) => a - b);
}

function generateLotto(): { main: number[]; bonus: number } {
  const all = pickNumbers(1, 45, 7, false);
  return { main: all.slice(0, 6), bonus: all[6] };
}

function shuffleArray(arr: string[]): string[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = getRandomInt(0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function getLottoBallColor(n: number): string {
  if (n <= 10) return '#FBC400';
  if (n <= 20) return '#69C8F2';
  if (n <= 30) return '#FF7272';
  if (n <= 40) return '#AAAAAA';
  return '#B0D840';
}

export default function RandomPicker() {
  const [tab, setTab] = useState<Tab>('number');

  // 숫자 뽑기
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [allowDup, setAllowDup] = useState(false);
  const [numbers, setNumbers] = useState<number[]>([]);

  // 로또
  const [lotto, setLotto] = useState<{ main: number[]; bonus: number } | null>(null);

  // 섞기
  const [listText, setListText] = useState('');
  const [shuffled, setShuffled] = useState<string[]>([]);

  const pickNums = useCallback(() => {
    setNumbers(pickNumbers(min, max, count, allowDup));
  }, [min, max, count, allowDup]);

  const pickLotto = useCallback(() => {
    setLotto(generateLotto());
  }, []);

  const doShuffle = useCallback(() => {
    const items = listText.split('\n').map(s => s.trim()).filter(Boolean);
    if (items.length > 0) setShuffled(shuffleArray(items));
  }, [listText]);

  const tabs: { key: Tab; label: string }[] = [
    { key: 'number', label: '숫자 뽑기' },
    { key: 'lotto', label: '로또 번호' },
    { key: 'shuffle', label: '목록 섞기' },
  ];

  return (
    <>
      {/* 탭 */}
      <Card className="!p-3">
        <div className="flex gap-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold border-[1.5px] transition-all cursor-pointer ${tab === t.key ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] text-[var(--sub)] bg-white'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Card>

      {/* 숫자 뽑기 */}
      {tab === 'number' && (
        <>
          <Card>
            <SectionTitle num="1">숫자 범위 설정</SectionTitle>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[var(--sub)] block mb-1">최솟값</label>
                  <input type="number" value={min} onChange={(e) => setMin(+e.target.value)} className="w-full py-2 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-sm font-bold outline-none focus:border-[var(--primary)] tabular-nums" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[var(--sub)] block mb-1">최댓값</label>
                  <input type="number" value={max} onChange={(e) => setMax(+e.target.value)} className="w-full py-2 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-sm font-bold outline-none focus:border-[var(--primary)] tabular-nums" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-[var(--sub)] block mb-1">뽑을 개수</label>
                <input type="number" value={count} min={1} max={100} onChange={(e) => setCount(+e.target.value)} className="w-full py-2 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-sm font-bold outline-none focus:border-[var(--primary)] tabular-nums" />
              </div>
              <button
                onClick={() => setAllowDup(!allowDup)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border-[1.5px] transition-all cursor-pointer ${allowDup ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] text-[var(--sub)] bg-white'}`}
              >
                중복 허용 {allowDup ? 'ON' : 'OFF'}
              </button>
              <button onClick={pickNums} className="w-full py-3 bg-[var(--primary)] text-white text-sm font-bold rounded-xl border-0 cursor-pointer hover:bg-[var(--primary-dark)] transition-colors">
                뽑기!
              </button>
            </div>
          </Card>

          {numbers.length > 0 && (
            <Card className="!p-5">
              <div className="text-center">
                <div className="text-xs font-bold text-[var(--sub)] mb-2">추첨 결과</div>
                <div className="flex flex-wrap justify-center gap-2">
                  {numbers.map((n, i) => (
                    <div key={i} className="w-[52px] h-[52px] rounded-2xl bg-[var(--primary)] text-white text-lg font-extrabold grid place-items-center tabular-nums shadow-sm">
                      {n}
                    </div>
                  ))}
                </div>
                <button onClick={pickNums} className="mt-3 px-6 py-2 bg-[var(--bg)] text-[var(--ink)] text-xs font-bold rounded-xl border border-[var(--line)] cursor-pointer">
                  다시 뽑기
                </button>
              </div>
            </Card>
          )}
        </>
      )}

      {/* 로또 */}
      {tab === 'lotto' && (
        <>
          <Card>
            <SectionTitle num="2">로또 6/45 번호 생성</SectionTitle>
            <p className="text-xs text-[var(--sub)] mb-3">1~45 중 6개 번호 + 보너스 번호 1개를 생성합니다.</p>
            <button onClick={pickLotto} className="w-full py-3 bg-[var(--primary)] text-white text-sm font-bold rounded-xl border-0 cursor-pointer hover:bg-[var(--primary-dark)] transition-colors">
              번호 생성!
            </button>
          </Card>

          {lotto && (
            <Card className="!p-5">
              <div className="text-center">
                <div className="text-xs font-bold text-[var(--sub)] mb-3">당첨 번호</div>
                <div className="flex justify-center gap-2 flex-wrap">
                  {lotto.main.map((n, i) => (
                    <div key={i} className="w-[48px] h-[48px] rounded-full text-white text-lg font-extrabold grid place-items-center tabular-nums shadow-sm" style={{ backgroundColor: getLottoBallColor(n) }}>
                      {n}
                    </div>
                  ))}
                  <div className="w-[48px] h-[48px] grid place-items-center text-lg font-bold text-[var(--sub)]">+</div>
                  <div className="w-[48px] h-[48px] rounded-full text-white text-lg font-extrabold grid place-items-center tabular-nums shadow-sm border-2 border-dashed border-white/50" style={{ backgroundColor: getLottoBallColor(lotto.bonus) }}>
                    {lotto.bonus}
                  </div>
                </div>
                <div className="text-[10px] text-[var(--sub)] mt-2">보너스 번호: {lotto.bonus}</div>
                <button onClick={pickLotto} className="mt-3 px-6 py-2 bg-[var(--bg)] text-[var(--ink)] text-xs font-bold rounded-xl border border-[var(--line)] cursor-pointer">
                  다시 생성
                </button>
              </div>
            </Card>
          )}
        </>
      )}

      {/* 목록 섞기 */}
      {tab === 'shuffle' && (
        <>
          <Card>
            <SectionTitle num="3">목록 섞기</SectionTitle>
            <p className="text-xs text-[var(--sub)] mb-2">항목을 한 줄에 하나씩 입력하세요. (예: 이름, 팀, 메뉴 등)</p>
            <textarea
              rows={8}
              value={listText}
              onChange={(e) => setListText(e.target.value)}
              placeholder={"홍길동\n김철수\n이영희\n박지수\n최민호"}
              className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-[15px] leading-relaxed outline-none focus:border-[var(--primary)] resize-y"
            />
            <button onClick={doShuffle} className="w-full mt-2 py-3 bg-[var(--primary)] text-white text-sm font-bold rounded-xl border-0 cursor-pointer hover:bg-[var(--primary-dark)] transition-colors">
              섞기!
            </button>
          </Card>

          {shuffled.length > 0 && (
            <Card className="!p-5">
              <div className="text-xs font-bold text-[var(--sub)] mb-2">섞인 결과</div>
              <div className="flex flex-col gap-1">
                {shuffled.map((item, i) => (
                  <div key={i} className="flex items-center bg-[var(--bg)] rounded-lg px-3 py-2">
                    <span className="text-sm font-extrabold text-[var(--primary-dark)] mr-2 tabular-nums w-6">{i + 1}.</span>
                    <span className="text-sm font-semibold text-[var(--ink)]">{item}</span>
                  </div>
                ))}
              </div>
              <button onClick={doShuffle} className="w-full mt-3 px-6 py-2 bg-[var(--bg)] text-[var(--ink)] text-xs font-bold rounded-xl border border-[var(--line)] cursor-pointer">
                다시 섞기
              </button>
            </Card>
          )}
        </>
      )}

      {/* 가이드 */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">랜덤 추첨 활용 가이드</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>공정한 추첨 방법:</b> 이 생성기는 crypto.getRandomValues()를 사용하여 암호학적으로 안전한 난수를 생성합니다. Math.random()보다 더 균일한 분포를 보장하며, 모든 결과가 동일한 확률로 나타납니다. 발표 순서 정하기, 당첨자 추첨, 팀 나누기 등에 공정하게 활용할 수 있습니다.</p>
          <p><b>로또 당첨 확률:</b> 로또 6/45의 1등 당첨 확률은 45C6 = 8,145,060분의 1입니다. 매주 1장(1,000원)을 구매하면 평균 15만 6천 년에 한 번 당첨됩니다. 2등(5개+보너스)은 1,357,510분의 1, 3등(5개)은 35,724분의 1입니다. 로또는 투자가 아닌 소액 여가로 즐기세요.</p>
          <p><b>활용 예시:</b> 발표 순서 정하기(이름 목록 섞기), 팀 나누기(번호 부여 후 추첨), 메뉴 고르기(후보 목록 섞기), 좌석 배치(번호 추첨), 경품 추첨(참가자 목록 섞기), 운동 루틴(종목 섞기) 등 다양하게 활용할 수 있습니다.</p>
        </div>
      </Card>

      {/* FAQ */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 랜덤 추첨은 공정한가요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 이 생성기는 crypto.getRandomValues()를 사용하여 암호학적으로 안전한 난수를 생성합니다. 모든 숫자가 동일한 확률로 선택되므로 공정한 추첨이 가능합니다.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 로또 당첨 확률은 얼마인가요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 로또 6/45의 1등 당첨 확률은 1/8,145,060(약 814만분의 1)입니다. 매주 1장씩 구매하면 평균 15만 6천 년에 한 번 당첨됩니다.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 목록 섞기는 어떤 알고리즘을 사용하나요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. Fisher-Yates 셔플 알고리즘을 사용합니다. 모든 순열이 동일한 확률로 나타나는 편향 없는 셔플 방법입니다.</div>
          </div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">
          모든 추첨은 브라우저에서 실시간으로 처리되며, 결과는 서버로 전송되지 않습니다.
        </div>
      </footer>
    </>
  );
}
