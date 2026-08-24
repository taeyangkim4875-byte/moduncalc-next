'use client';

import { useState, useEffect } from 'react';
import {
  getProfileValues,
  deleteProfileKey,
  clearProfile,
  isStale,
  PROFILE_FIELDS,
  type ProfileEntry,
} from '@/utils/profile';

export default function ProfilePanel() {
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState<Record<string, ProfileEntry>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) setEntries(getProfileValues());
  }, [open]);

  const count = mounted ? Object.keys(entries).length : 0;

  function handleDelete(key: string) {
    deleteProfileKey(key);
    setEntries(getProfileValues());
  }

  function handleClearAll() {
    clearProfile();
    setEntries({});
  }

  if (!mounted) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13px] font-bold bg-white border-[1.5px] border-[var(--line)] text-[var(--ink)] cursor-pointer hover:border-[var(--primary)] transition-colors"
      >
        <span>👤</span>
        <span>내 정보</span>
        {count > 0 && (
          <span className="bg-[var(--primary)] text-white text-[10px] font-extrabold rounded-full w-[18px] h-[18px] flex items-center justify-center">
            {count}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-[480px] max-h-[80vh] overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-white px-5 pt-5 pb-3 border-b border-[var(--line)] flex items-center justify-between z-10">
              <h2 className="text-lg font-extrabold">👤 내 정보</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-[var(--sub)] text-lg bg-transparent border-0 cursor-pointer hover:text-[var(--ink)]"
              >✕</button>
            </div>

            <div className="px-5 py-4">
              {Object.keys(entries).length === 0 ? (
                <div className="text-center py-8 text-sm text-[var(--sub)]">
                  저장된 정보가 없어요.<br />
                  계산기를 사용하면 자동으로 저장됩니다.
                </div>
              ) : (
                <div className="flex flex-col gap-2.5">
                  {Object.entries(entries).map(([key, entry]) => {
                    const meta = PROFILE_FIELDS[key];
                    if (!meta) return null;
                    const stale = isStale(entry);
                    const date = new Date(entry.updatedAt);
                    const dateStr = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;

                    return (
                      <div
                        key={key}
                        className={`flex items-center justify-between p-3 rounded-xl border ${
                          stale ? 'border-[#F0C040] bg-[#FFFDF0]' : 'border-[var(--line)] bg-white'
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-[var(--ink)]">
                            {meta.label}
                            {stale && (
                              <span className="ml-1.5 text-[10px] font-extrabold text-[#C08800] bg-[#FFF3CC] px-1.5 py-0.5 rounded">
                                오래된 값
                              </span>
                            )}
                          </div>
                          <div className="text-[13px] text-[var(--sub)] mt-0.5">
                            {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
                            {meta.unit} · {dateStr}
                          </div>
                        </div>
                        <button
                          onClick={() => handleDelete(key)}
                          className="text-[var(--sub)] text-xs bg-transparent border-0 cursor-pointer hover:text-[#E8344E] px-2 py-1"
                        >
                          삭제
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {Object.keys(entries).length > 0 && (
              <div className="px-5 pb-5 flex gap-2">
                <button
                  onClick={handleClearAll}
                  className="flex-1 py-3 rounded-xl text-sm font-bold border-[1.5px] border-[#E8344E] text-[#E8344E] bg-white cursor-pointer hover:bg-[#FFF0F0]"
                >
                  전체 초기화
                </button>
              </div>
            )}

            <div className="px-5 pb-5">
              <div className="text-[11px] text-[var(--sub)] leading-relaxed bg-[#F8F9FA] rounded-xl p-3">
                입력값은 이 기기의 브라우저에만 저장되며 서버로 전송되지 않습니다.
                브라우저 데이터를 삭제하면 함께 삭제됩니다.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
