'use client';

import { PROFILE_FIELDS } from '@/utils/profile';

interface ProfileBannerProps {
  filledKeys: string[];
  onEdit?: () => void;
}

export default function ProfileBanner({ filledKeys, onEdit }: ProfileBannerProps) {
  if (filledKeys.length === 0) return null;

  const labels = filledKeys
    .map(k => PROFILE_FIELDS[k]?.label)
    .filter(Boolean)
    .join(', ');

  return (
    <div className="bg-[#EBF4FF] border border-[#B8D4F0] rounded-xl px-3.5 py-3 mb-3.5 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-base flex-none">💾</span>
        <span className="text-[12.5px] font-semibold text-[#1B64A7] truncate">
          저장된 내 정보에서 불러왔어요 ({labels})
        </span>
      </div>
      {onEdit && (
        <button
          onClick={onEdit}
          className="text-[12px] font-bold text-[#1B64A7] bg-transparent border-0 cursor-pointer flex-none hover:underline"
        >
          수정
        </button>
      )}
    </div>
  );
}
