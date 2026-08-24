interface ResultRowProps {
  label: string;
  value: string;
  bold?: boolean;
  color?: string;
  separator?: boolean;
  bg?: boolean;
}

export default function ResultRow({ label, value, bold, color, separator, bg }: ResultRowProps) {
  const base = bg
    ? 'flex justify-between items-center text-[13.5px] bg-[var(--bg)] rounded-xl px-3 py-2.5'
    : `flex justify-between items-center text-[13.5px]${separator ? ' border-t border-[var(--line)] pt-2.5' : ''}`;

  return (
    <div className={base}>
      <span className={bold ? 'font-bold' : 'text-[var(--sub)] font-semibold'}>{label}</span>
      <span className={`${bold ? 'font-extrabold' : 'font-bold'}`} style={color ? { color } : undefined}>{value}</span>
    </div>
  );
}
