import { CURRENT_YEAR, LAST_REVIEWED } from '@/data/constants';

export default function TrustBadge() {
  return (
    <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[var(--green)] bg-[#E6F8F0] py-1 px-2.5 rounded-lg">
      <span>✓</span>
      <span>{CURRENT_YEAR}년 기준</span>
      <span className="text-[#8B95A1] font-medium">· {LAST_REVIEWED} 검토</span>
    </div>
  );
}
