'use client';

import { useState, useEffect } from 'react';
import { calcUsageCount } from '@/utils/calcHistory';
import { hasSeenProfileNotice, markProfileNoticeSeen } from '@/utils/profile';

export default function SavePrompt() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const usage = calcUsageCount();
    const noticed = hasSeenProfileNotice();
    if (usage >= 3 && !noticed) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  function handleDismiss() {
    markProfileNoticeSeen();
    setShow(false);
  }

  return (
    <div className="bg-[#F0F7FF] rounded-xl px-3.5 py-3 mb-3 flex items-center justify-between gap-2">
      <span className="text-[12.5px] text-[#1B64A7] font-semibold">
        💡 입력값이 자동 저장돼서 다음에 다시 입력하지 않아도 돼요
      </span>
      <button
        onClick={handleDismiss}
        className="text-[11px] font-bold text-[#1B64A7] bg-transparent border-0 cursor-pointer flex-none hover:underline"
      >
        확인
      </button>
    </div>
  );
}
