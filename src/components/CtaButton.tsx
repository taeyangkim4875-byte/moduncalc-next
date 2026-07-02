'use client';

interface CtaButtonProps {
  label: string;
  onClick: () => void;
}

export default function CtaButton({ label, onClick }: CtaButtonProps) {
  return (
    <div className="fixed left-0 right-0 bottom-0 px-4 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 bg-gradient-to-t from-[var(--bg)] to-transparent z-50 lg:left-[var(--sb-w)]">
      <button
        className="max-w-[560px] mx-auto block w-full py-4 border-0 rounded-[14px] bg-[var(--primary)] text-white text-[17px] font-extrabold cursor-pointer shadow-[var(--shadow-h)] transition-all hover:bg-[var(--primary-dark)] active:scale-[.985]"
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
}
