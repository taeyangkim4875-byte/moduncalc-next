'use client';
import Link from 'next/link';
import { trackReverseModeUsed } from '@/utils/analytics';

interface ModeToggleProps {
  forwardHref: string;
  reverseHref: string;
  mode: 'forward' | 'reverse';
  forwardLabel?: string;
  reverseLabel?: string;
}

export default function ModeToggle({
  forwardHref,
  reverseHref,
  mode,
  forwardLabel = '정방향',
  reverseLabel = '역방향',
}: ModeToggleProps) {
  return (
    <div className="flex gap-1.5 bg-[#F2F4F6] rounded-xl p-1 mb-4">
      <Link
        href={forwardHref}
        className={`flex-1 py-2.5 rounded-[10px] text-sm font-bold text-center no-underline transition-all ${
          mode === 'forward'
            ? 'bg-white text-[var(--primary)] shadow-sm'
            : 'bg-transparent text-[var(--sub)]'
        }`}
      >
        {forwardLabel}
      </Link>
      <Link
        href={reverseHref}
        onClick={() => { if (mode === 'forward') trackReverseModeUsed(reverseHref); }}
        className={`flex-1 py-2.5 rounded-[10px] text-sm font-bold text-center no-underline transition-all ${
          mode === 'reverse'
            ? 'bg-white text-[var(--primary)] shadow-sm'
            : 'bg-transparent text-[var(--sub)]'
        }`}
      >
        {reverseLabel}
      </Link>
    </div>
  );
}
