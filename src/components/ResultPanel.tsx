interface ResultPanelProps {
  label?: string;
  value: string;
  sub?: string;
  variant?: 'primary' | 'green' | 'red' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const BG: Record<string, string> = {
  primary: 'bg-[var(--primary-weak)]',
  green: 'bg-[#E6F8F0]',
  red: 'bg-[#FFE5E5]',
  neutral: 'bg-[var(--bg)]',
};

const COLOR: Record<string, string> = {
  primary: 'text-[var(--primary-dark)]',
  green: 'text-[var(--green)]',
  red: 'text-[#E5484D]',
  neutral: 'text-[var(--ink)]',
};

const SIZE: Record<string, string> = {
  sm: 'text-xl',
  md: 'text-[28px]',
  lg: 'text-[38px]',
};

export default function ResultPanel({ label, value, sub, variant = 'primary', size = 'md', className = '' }: ResultPanelProps) {
  return (
    <div className={`${BG[variant]} rounded-[14px] p-4 text-center ${className}`}>
      {label && <div className={`text-xs font-bold ${COLOR[variant]}`}>{label}</div>}
      <div className={`${SIZE[size]} font-extrabold ${COLOR[variant]} tracking-tight`}>{value}</div>
      {sub && <div className="text-xs text-[var(--sub)] mt-1">{sub}</div>}
    </div>
  );
}
