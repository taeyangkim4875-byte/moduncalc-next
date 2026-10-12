'use client';

/**
 * 금액 입력 필드.
 *
 * - 천 단위 콤마를 보여주되 값은 정수로 다룬다
 * - 모바일에서 숫자 키패드가 뜨도록 inputMode="numeric"
 *   (type="number" 를 쓰면 콤마를 넣을 수 없어 type="text" + 필터링 방식)
 */

interface MoneyInputProps {
  label?: string;
  value: number;
  onChange: (v: number) => void;
  placeholder?: string;
  unit?: string;
  hint?: string;
  className?: string;
}

export default function MoneyInput({
  label,
  value,
  onChange,
  placeholder = '0',
  unit = '원',
  hint,
  className = 'mb-4',
}: MoneyInputProps) {
  const display = value > 0 ? value.toLocaleString('ko-KR') : '';

  const handle = (raw: string) => {
    const digits = raw.replace(/[^\d]/g, '');
    onChange(digits === '' ? 0 : Number(digits));
  };

  return (
    <div className={className}>
      {label && <label className="block text-sm font-bold mb-2">{label}</label>}
      <div className="flex items-center gap-2">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9,]*"
          value={display}
          placeholder={placeholder}
          onChange={e => handle(e.target.value)}
          className="flex-1 min-w-0 px-3.5 py-3 rounded-xl border border-[var(--line)] text-base font-bold text-[var(--ink)] text-right outline-none focus:border-[var(--primary)]"
        />
        <span className="text-sm font-bold text-[var(--sub)] flex-none">{unit}</span>
      </div>
      {hint && <p className="text-xs text-[var(--sub)] mt-1.5 m-0">{hint}</p>}
    </div>
  );
}
