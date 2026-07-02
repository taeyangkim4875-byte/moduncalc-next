interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <section className={`bg-white rounded-[var(--radius)] shadow-[var(--shadow)] p-5 mb-3.5 ${className}`}>
      {children}
    </section>
  );
}

export function SectionTitle({ num, children }: { num: string; children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 text-base font-extrabold m-0 mb-4">
      <span className="w-[22px] h-[22px] rounded-lg bg-[var(--primary-weak)] text-[var(--primary)] text-xs font-extrabold grid place-items-center flex-none">{num}</span>
      {children}
    </h2>
  );
}
