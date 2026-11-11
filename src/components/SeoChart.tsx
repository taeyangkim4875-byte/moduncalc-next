import Card from './Card';

/**
 * 계산 구조를 보여주는 본문 차트와 샘플 입출력 블록.
 *
 * 서버 컴포넌트입니다. JS 없이 HTML 에 그대로 들어가야 합니다 —
 * 심사자와 크롤러가 보는 건 초기 HTML 이기 때문입니다.
 *
 * 왜 만들었나:
 * 도구 사이트의 AdSense 승인 패턴이 "Tool + 설명 + 한계 + 예시 + 면책"이고,
 * 거절 패턴은 "입력창 + 짧은 글"입니다. 설명·면책·출처는 이미 갖췄는데
 * 187개 페이지에 시각 자료가 0개였습니다. 스크린샷은 베껴올 수 있지만
 * 계산 구조를 그린 차트는 템플릿으로 찍어낼 수 없어서, "프로그래매틱
 * 페이지 차별화" 항목에도 함께 작동합니다.
 *
 * 외부 라이브러리를 쓰지 않습니다. 인라인 SVG 로 충분하고,
 * 차트 하나 때문에 번들을 키울 이유가 없습니다.
 */

const PALETTE = ['var(--primary)', 'var(--green)', 'var(--violet)', 'var(--sub)'];

export interface BarItem {
  label: string;
  value: number;
  /** 막대 옆에 붙는 설명. 없으면 값만 표시한다. */
  note?: string;
  /** 강조할 항목. 비교에서 결론이 되는 막대에 쓴다. */
  highlight?: boolean;
}

/**
 * 가로 막대 차트.
 *
 * 가로로 그리는 이유: 레이블이 한국어라 세로 막대에서는 글자가 겹친다.
 * 컨테이너 폭이 528px 뿐이라 더 그렇다.
 */
export function SeoBarChart({
  title,
  items,
  unit = '',
  caption,
}: {
  title: string;
  items: BarItem[];
  unit?: string;
  caption?: string;
}) {
  const max = Math.max(...items.map((i) => i.value), 1);
  const ROW_H = 38;
  const LABEL_W = 116;
  const BAR_MAX = 300;
  const W = LABEL_W + BAR_MAX + 56;
  const H = items.length * ROW_H + 8;

  return (
    <Card>
      <h2 className="text-base font-extrabold mb-1">{title}</h2>
      {caption && <p className="text-xs text-[var(--sub)] mb-3 leading-relaxed">{caption}</p>}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        role="img"
        aria-label={`${title}. ${items.map((i) => `${i.label} ${i.value.toLocaleString()}${unit}`).join(', ')}`}
        className="block overflow-visible"
      >
        {items.map((it, i) => {
          const y = i * ROW_H + 4;
          const w = Math.max((it.value / max) * BAR_MAX, 2);
          const fill = it.highlight ? 'var(--primary)' : PALETTE[i % PALETTE.length];
          return (
            <g key={it.label}>
              <text x={0} y={y + 17} fontSize={11.5} fontWeight={700} fill="var(--ink)">
                {it.label}
              </text>
              <rect x={LABEL_W} y={y + 4} width={w} height={17} rx={4} fill={fill} opacity={it.highlight ? 1 : 0.75} />
              <text x={LABEL_W + w + 7} y={y + 17} fontSize={11} fontWeight={800} fill="var(--ink)">
                {it.value.toLocaleString()}
                {unit}
              </text>
              {it.note && (
                <text x={LABEL_W} y={y + 32} fontSize={9.5} fill="var(--sub)">
                  {it.note}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </Card>
  );
}

/**
 * 샘플 입출력.
 *
 * "이 값을 넣으면 이 결과가 나온다"를 고정된 숫자로 보여줍니다.
 * 도구 사이트 체크리스트의 "sample inputs/outputs" 항목이고, 사용자가
 * 계산기를 쓰기 전에 무엇이 나오는지 가늠하게 해줍니다.
 */
export function SeoSampleIO({
  title = '이렇게 넣으면 이렇게 나옵니다',
  inputs,
  outputs,
  note,
}: {
  title?: string;
  inputs: { label: string; value: string }[];
  outputs: { label: string; value: string }[];
  note?: string;
}) {
  return (
    <Card>
      <h2 className="text-base font-extrabold mb-3">{title}</h2>
      <div className="flex flex-col gap-2.5">
        <div>
          <div className="text-[11px] font-bold text-[var(--sub)] mb-1.5">입력</div>
          <div className="flex flex-col gap-1">
            {inputs.map((r) => (
              <div key={r.label} className="flex justify-between bg-[var(--bg)] rounded-xl px-3 py-2 text-[13px]">
                <span className="font-semibold text-[#4E5968]">{r.label}</span>
                <span className="font-bold text-[var(--ink)]">{r.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center text-[var(--sub)] text-xs leading-none">↓</div>
        <div>
          <div className="text-[11px] font-bold text-[var(--sub)] mb-1.5">결과</div>
          <div className="flex flex-col gap-1">
            {outputs.map((r) => (
              <div
                key={r.label}
                className="flex justify-between bg-[var(--primary-weak)] rounded-xl px-3 py-2 text-[13px]"
              >
                <span className="font-semibold text-[var(--primary-dark)]">{r.label}</span>
                <span className="font-extrabold text-[var(--primary-dark)]">{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {note && <p className="text-xs text-[var(--sub)] mt-3 leading-relaxed">{note}</p>}
    </Card>
  );
}
