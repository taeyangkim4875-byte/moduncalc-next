'use client';

import { useState, useEffect } from 'react';
import { isFirstSave, markFirstSaveDone, profileCount } from '@/utils/profile';

export default function FirstSaveNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (profileCount() > 0 && isFirstSave()) {
      setShow(true);
      markFirstSaveDone();
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] max-w-[420px] w-[calc(100%-32px)] bg-[#1B2A3D] text-white rounded-2xl px-4 py-3.5 shadow-xl flex items-center gap-3 animate-[slideUp_0.3s_ease-out]">
      <span className="text-lg flex-none">🔒</span>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-bold">입력값이 자동 저장됩니다</div>
        <div className="text-[11.5px] text-[#A0B0C0] mt-0.5">이 기기에만 저장되며 서버로 전송되지 않습니다</div>
      </div>
      <button
        onClick={() => setShow(false)}
        className="text-[12px] font-bold text-[#6CB4FF] bg-transparent border-0 cursor-pointer flex-none hover:underline"
      >
        확인
      </button>
    </div>
  );
}
