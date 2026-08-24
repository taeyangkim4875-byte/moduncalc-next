'use client';

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  hint?: string;
  minLabel?: string;
  maxLabel?: string;
  className?: string;
}

export default function SliderInput({
  label, value, onChange, min, max, step = 1,
  unit, hint, minLabel, maxLabel, className = 'mb-4',
}: SliderInputProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-bold mb-2">
        {label}
        {hint && <span className="text-xs text-[var(--sub)] font-medium ml-1">{hint}</span>}
      </label>
      <div className="flex items-center gap-2.5">
        <input
          type="number"
          value={value || ''}
          onChange={e => onChange(+e.target.value)}
          min={min}
          max={max}
          step={step}
          className="flex-1 w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold text-[var(--ink)] outline-none bg-white focus:border-[var(--primary)]"
        />
        {unit && <span className="text-sm font-bold text-[var(--sub)]">{unit}</span>}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(+e.target.value)}
        className="w-full mt-3.5"
      />
      {(minLabel || maxLabel) && (
        <div className="flex justify-between text-[10px] text-[var(--sub)] mt-1">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      )}
    </div>
  );
}
