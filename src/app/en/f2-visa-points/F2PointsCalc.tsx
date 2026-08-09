'use client';

import { useMemo, useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import ShareButtons from '@/components/ShareButtons';
import {
  CATEGORIES,
  BONUS_ITEMS,
  PENALTY_ITEMS,
  PASS_MARK,
  BONUS_CAP,
  PENALTY_CAP,
  stayPeriod,
  UI,
  type CategoryKey,
  type ExtraItem,
} from './content';

/** Expandable plain-English note for Korean administrative terms. Tap-based, so it works on touch. */
function Glossary({ term, body }: { term: string; body: string }) {
  return (
    <details className="mt-2 rounded-xl bg-[var(--bg)] px-3.5 py-2.5">
      <summary className="cursor-pointer list-none text-[13px] font-bold text-[var(--primary)] marker:hidden">
        ⓘ {term}
      </summary>
      <p className="mt-2 text-[13px] leading-relaxed text-[#4E5968]">{body}</p>
    </details>
  );
}

function OptionButton({
  selected,
  label,
  hint,
  points,
  onClick,
}: {
  selected: boolean;
  label: string;
  hint?: string;
  points: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex w-full min-h-12 items-center justify-between gap-3 rounded-xl border-[1.5px] p-4 text-left transition-all active:scale-[.99] ${
        selected
          ? 'border-[var(--primary)] bg-[var(--primary-weak)]'
          : 'border-[var(--line)] bg-white hover:border-[var(--primary)]'
      }`}
    >
      <span className="min-w-0">
        <span className={`block text-sm font-bold ${selected ? 'text-[var(--primary-dark)]' : 'text-[var(--ink)]'}`}>
          {label}
        </span>
        {hint && <span className="mt-0.5 block text-xs font-medium text-[var(--sub)]">{hint}</span>}
      </span>
      <span
        className={`flex-none text-sm font-extrabold tabular-nums ${
          selected ? 'text-[var(--primary-dark)]' : 'text-[var(--sub)]'
        }`}
      >
        {points > 0 ? `+${points}` : points}
      </span>
    </button>
  );
}

function CheckRow({
  checked,
  item,
  onToggle,
}: {
  checked: boolean;
  item: ExtraItem;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={checked}
      className={`flex w-full min-h-12 items-center gap-3 rounded-xl border-[1.5px] p-4 text-left transition-all active:scale-[.99] ${
        checked ? 'border-[var(--primary)] bg-[var(--primary-weak)]' : 'border-[var(--line)] bg-white'
      }`}
    >
      <span
        className={`grid h-[22px] w-[22px] flex-none place-items-center rounded-md border-[1.5px] text-xs font-extrabold ${
          checked ? 'border-[var(--primary)] bg-[var(--primary)] text-white' : 'border-[var(--line)] bg-white text-transparent'
        }`}
        aria-hidden="true"
      >
        ✓
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold text-[var(--ink)]">{item.label}</span>
        {item.hint && <span className="mt-0.5 block text-xs font-medium text-[var(--sub)]">{item.hint}</span>}
      </span>
      <span
        className={`flex-none text-sm font-extrabold tabular-nums ${
          item.points < 0 ? 'text-[#E5484D]' : 'text-[var(--green)]'
        }`}
      >
        {item.points > 0 ? `+${item.points}` : item.points}
      </span>
    </button>
  );
}

export default function F2PointsCalc() {
  const [answers, setAnswers] = useState<Partial<Record<CategoryKey, string>>>({});
  const [bonuses, setBonuses] = useState<string[]>([]);
  const [penalties, setPenalties] = useState<string[]>([]);

  const score = useMemo(() => {
    const perCategory = {} as Record<CategoryKey, number>;
    let common = 0;
    for (const cat of CATEGORIES) {
      const chosen = cat.options.find(o => o.id === answers[cat.key]);
      const pts = chosen ? chosen.points : 0;
      perCategory[cat.key] = pts;
      common += pts;
    }

    const rawBonus = BONUS_ITEMS.filter(b => bonuses.includes(b.id)).reduce((s, b) => s + b.points, 0);
    const bonus = Math.min(rawBonus, BONUS_CAP);

    const rawPenalty = PENALTY_ITEMS.filter(p => penalties.includes(p.id)).reduce((s, p) => s + p.points, 0);
    const penalty = Math.max(rawPenalty, PENALTY_CAP);

    const total = Math.max(0, common + bonus + penalty);
    return { perCategory, common, bonus, penalty, total };
  }, [answers, bonuses, penalties]);

  const answeredCount = CATEGORIES.filter(c => answers[c.key] !== undefined).length;
  const started = answeredCount > 0 || bonuses.length > 0 || penalties.length > 0;
  const eligible = score.total >= PASS_MARK;
  const period = stayPeriod(score.total);
  const progress = Math.min(100, (score.total / PASS_MARK) * 100);

  const toggle = (list: string[], set: (v: string[]) => void, id: string) =>
    set(list.includes(id) ? list.filter(x => x !== id) : [...list, id]);

  const reset = () => {
    setAnswers({});
    setBonuses([]);
    setPenalties([]);
  };

  return (
    <div className="pb-28">
      {CATEGORIES.map(cat => (
        <Card key={cat.key}>
          <div className="mb-1 flex items-start justify-between gap-3">
            <SectionTitle num={cat.num}>{cat.title}</SectionTitle>
            <span className="flex-none pt-0.5 text-sm font-extrabold tabular-nums text-[var(--primary-dark)]">
              {score.perCategory[cat.key]} / {cat.max}
            </span>
          </div>
          <p className="mb-3 text-[13px] leading-relaxed text-[var(--sub)]">{cat.subtitle}</p>
          {cat.glossary && <Glossary term={cat.glossary.term} body={cat.glossary.body} />}
          <div className="mt-3 flex flex-col gap-2">
            {cat.options.map(opt => (
              <OptionButton
                key={opt.id}
                selected={answers[cat.key] === opt.id}
                label={opt.label}
                hint={opt.hint}
                points={opt.points}
                onClick={() => setAnswers(prev => ({ ...prev, [cat.key]: opt.id }))}
              />
            ))}
          </div>
        </Card>
      ))}

      <Card>
        <div className="mb-1 flex items-start justify-between gap-3">
          <SectionTitle num="5">{UI.bonusTitle}</SectionTitle>
          <span className="flex-none pt-0.5 text-sm font-extrabold tabular-nums text-[var(--green)]">
            +{score.bonus}
          </span>
        </div>
        <p className="mb-3 text-[13px] leading-relaxed text-[var(--sub)]">{UI.bonusSubtitle}</p>
        <div className="flex flex-col gap-2">
          {BONUS_ITEMS.map(item => (
            <CheckRow
              key={item.id}
              item={item}
              checked={bonuses.includes(item.id)}
              onToggle={() => toggle(bonuses, setBonuses, item.id)}
            />
          ))}
        </div>
      </Card>

      <Card>
        <div className="mb-1 flex items-start justify-between gap-3">
          <SectionTitle num="6">{UI.penaltyTitle}</SectionTitle>
          <span className="flex-none pt-0.5 text-sm font-extrabold tabular-nums text-[#E5484D]">
            {score.penalty}
          </span>
        </div>
        <p className="mb-3 text-[13px] leading-relaxed text-[var(--sub)]">{UI.penaltySubtitle}</p>
        <div className="flex flex-col gap-2">
          {PENALTY_ITEMS.map(item => (
            <CheckRow
              key={item.id}
              item={item}
              checked={penalties.includes(item.id)}
              onToggle={() => toggle(penalties, setPenalties, item.id)}
            />
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="mb-3 text-base font-extrabold">{UI.breakdown}</h2>
        <div className="flex flex-col gap-2 text-sm">
          {CATEGORIES.map(cat => (
            <div key={cat.key} className="flex justify-between">
              <span className="font-semibold text-[var(--sub)]">{cat.title}</span>
              <span className="font-bold tabular-nums">
                {score.perCategory[cat.key]} <span className="text-[var(--sub)]">/ {cat.max}</span>
              </span>
            </div>
          ))}
          <div className="flex justify-between">
            <span className="font-semibold text-[var(--sub)]">{UI.bonusTitle}</span>
            <span className="font-bold tabular-nums text-[var(--green)]">+{score.bonus}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-[var(--sub)]">{UI.penaltyTitle}</span>
            <span className="font-bold tabular-nums text-[#E5484D]">{score.penalty}</span>
          </div>
          <div className="mt-1 flex justify-between border-t border-[var(--line)] pt-2.5">
            <span className="font-extrabold">Total</span>
            <span className="text-base font-extrabold tabular-nums text-[var(--primary-dark)]">{score.total}</span>
          </div>
        </div>
        {started && (
          <button
            type="button"
            onClick={reset}
            className="mt-4 w-full min-h-12 cursor-pointer rounded-xl border-[1.5px] border-[var(--line)] bg-white p-4 text-sm font-bold text-[var(--sub)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
          >
            {UI.reset}
          </button>
        )}
      </Card>

      <ShareButtons title="F-2-7 Visa Points Calculator" />

      <p className="mt-2 px-1.5 pt-2 text-[11.5px] leading-relaxed text-[var(--sub)]">{UI.disclaimer}</p>

      {/* Sticky live score bar — mirrors CtaButton positioning so it clears the desktop sidebar. */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)] to-transparent px-4 pb-[calc(12px+env(safe-area-inset-bottom))] pt-4 lg:left-[var(--sb-w)]"
        role="status"
        aria-live="polite"
      >
        <div
          className={`mx-auto max-w-[560px] rounded-[14px] border-[1.5px] bg-white p-4 shadow-[var(--shadow-h)] ${
            !started ? 'border-[var(--line)]' : eligible ? 'border-[var(--green)]' : 'border-[#E5484D]'
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[11px] font-bold text-[var(--sub)]">{UI.scoreLabel}</div>
              <div className="text-[26px] font-extrabold leading-tight tabular-nums text-[var(--ink)]">
                {score.total}
                <span className="ml-1 text-sm font-bold text-[var(--sub)]">/ {PASS_MARK} to pass</span>
              </div>
            </div>
            <div
              className={`flex-none rounded-full px-3.5 py-2 text-sm font-extrabold ${
                !started
                  ? 'bg-[var(--bg)] text-[var(--sub)]'
                  : eligible
                    ? 'bg-[#E6F8F0] text-[var(--green)]'
                    : 'bg-[#FFEBEE] text-[#E5484D]'
              }`}
            >
              {!started ? UI.idle : eligible ? `✅ ${UI.eligible}` : `❌ ${UI.notEligible}`}
            </div>
          </div>
          <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-[var(--bg)]">
            <div
              className={`h-full rounded-full transition-all ${eligible ? 'bg-[var(--green)]' : 'bg-[#E5484D]'}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-[11.5px] font-semibold leading-relaxed text-[var(--sub)]">
            {!started
              ? UI.idleNote
              : eligible
                ? `${UI.eligibleNote}${period ? ` ${UI.stayNote(period)}` : ''}`
                : UI.notEligibleNote(PASS_MARK - score.total)}
          </p>
        </div>
      </div>
    </div>
  );
}
