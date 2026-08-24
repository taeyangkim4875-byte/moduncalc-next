'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Card from '@/components/Card';
import { getHistory, clearHistory, exportHistory, importHistory, type HistoryEntry } from '@/utils/calcHistory';
import { getCalc } from '@/data/calculators';

function formatDate(iso: string): string {
  const d = new Date(iso);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, '0');
  return `${month}/${day} ${h}:${m}`;
}

function buildRestoreUrl(entry: HistoryEntry): string {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(entry.inputs)) {
    params.set(k, String(v));
  }
  return `${entry.calcId}?${params.toString()}`;
}

export default function HistoryClient() {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [compareMode, setCompareMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEntries(getHistory());
  }, []);

  function handleClear() {
    clearHistory();
    setEntries([]);
    setSelected(new Set());
  }

  function handleExport() {
    const json = exportHistory();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'moduncalc-history.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      if (importHistory(text)) {
        setEntries(getHistory());
      }
    };
    reader.readAsText(file);
  }

  function toggleSelect(idx: number) {
    const next = new Set(selected);
    if (next.has(idx)) next.delete(idx);
    else if (next.size < 2) next.add(idx);
    setSelected(next);
  }

  const selectedEntries = Array.from(selected).sort().map(i => entries[i]);
  const canCompare = selectedEntries.length === 2 &&
    selectedEntries[0].calcId === selectedEntries[1].calcId;

  if (entries.length === 0) {
    return (
      <Card className="text-center py-10">
        <div className="text-3xl mb-3">📋</div>
        <div className="text-sm text-[var(--sub)]">
          아직 계산 기록이 없어요.<br />계산기를 사용하면 여기에 기록됩니다.
        </div>
      </Card>
    );
  }

  return (
    <>
      <div className="flex gap-2 mb-3.5 flex-wrap">
        <button
          onClick={() => { setCompareMode(!compareMode); setSelected(new Set()); }}
          className={`px-3 py-2 rounded-xl text-[13px] font-bold border-[1.5px] cursor-pointer transition-colors ${
            compareMode
              ? 'bg-[var(--primary-weak)] border-[var(--primary)] text-[var(--primary-dark)]'
              : 'bg-white border-[var(--line)] text-[var(--sub)]'
          }`}
        >
          {compareMode ? '비교 취소' : '비교하기'}
        </button>
        <button
          onClick={handleExport}
          className="px-3 py-2 rounded-xl text-[13px] font-bold bg-white border-[1.5px] border-[var(--line)] text-[var(--sub)] cursor-pointer hover:border-[var(--primary)]"
        >
          내보내기
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-3 py-2 rounded-xl text-[13px] font-bold bg-white border-[1.5px] border-[var(--line)] text-[var(--sub)] cursor-pointer hover:border-[var(--primary)]"
        >
          가져오기
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
        <button
          onClick={handleClear}
          className="px-3 py-2 rounded-xl text-[13px] font-bold bg-white border-[1.5px] border-[#E8344E] text-[#E8344E] cursor-pointer hover:bg-[#FFF0F0] ml-auto"
        >
          전체 삭제
        </button>
      </div>

      {compareMode && selected.size > 0 && (
        <div className="text-[12.5px] text-[var(--sub)] mb-2 px-1">
          {selected.size}/2 선택됨
          {selected.size === 2 && !canCompare && (
            <span className="text-[#E8344E] ml-2">같은 계산기의 기록만 비교할 수 있어요</span>
          )}
        </div>
      )}

      {canCompare && <CompareView a={selectedEntries[0]} b={selectedEntries[1]} />}

      <div className="flex flex-col gap-2.5">
        {entries.map((entry, i) => {
          const meta = getCalc(entry.calcId);
          const isSelected = selected.has(i);

          return (
            <div
              key={`${entry.timestamp}-${i}`}
              className={`bg-white rounded-xl border-[1.5px] p-3.5 transition-colors ${
                isSelected
                  ? 'border-[var(--primary)] bg-[var(--primary-weak)]'
                  : 'border-[var(--line)]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  {compareMode && (
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelect(i)}
                      className="w-4 h-4 flex-none accent-[var(--primary)]"
                    />
                  )}
                  <span className="text-base flex-none">{meta?.icon ?? '📊'}</span>
                  <span className="text-sm font-bold text-[var(--ink)] truncate">
                    {meta?.title ?? entry.calcId}
                  </span>
                </div>
                <span className="text-[11px] text-[var(--sub)] flex-none">
                  {formatDate(entry.timestamp)}
                </span>
              </div>

              <div className="text-[22px] font-extrabold text-[var(--primary-dark)] mb-2">
                {entry.primaryOutput}
              </div>

              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {Object.entries(entry.inputs).slice(0, 4).map(([k, v]) => (
                  <span
                    key={k}
                    className="text-[11px] font-semibold text-[var(--sub)] bg-[#F2F4F6] px-2 py-0.5 rounded"
                  >
                    {k}: {typeof v === 'number' ? v.toLocaleString() : v}
                  </span>
                ))}
              </div>

              <Link
                href={buildRestoreUrl(entry)}
                className="text-[12.5px] font-bold text-[var(--primary)] no-underline hover:underline"
              >
                이 결과로 복원하기 →
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

function CompareView({ a, b }: { a: HistoryEntry; b: HistoryEntry }) {
  const meta = getCalc(a.calcId);
  const allKeys = Array.from(new Set([...Object.keys(a.inputs), ...Object.keys(b.inputs)]));

  return (
    <Card className="mb-3.5">
      <div className="text-sm font-extrabold mb-3 flex items-center gap-2">
        <span>{meta?.icon ?? '📊'}</span>
        <span>{meta?.title ?? a.calcId} 비교</span>
      </div>

      <div className="grid grid-cols-3 gap-1 text-[12.5px]">
        <div className="font-bold text-[var(--sub)] py-1.5">항목</div>
        <div className="font-bold text-center text-[var(--sub)] py-1.5">{formatDate(a.timestamp)}</div>
        <div className="font-bold text-center text-[var(--sub)] py-1.5">{formatDate(b.timestamp)}</div>

        {allKeys.map(key => {
          const va = a.inputs[key];
          const vb = b.inputs[key];
          const changed = String(va) !== String(vb);
          return (
            <div key={key} className="contents">
              <div className="py-1.5 font-semibold text-[var(--ink)] border-t border-[var(--line)]">{key}</div>
              <div className={`py-1.5 text-center border-t border-[var(--line)] ${changed ? 'font-bold text-[var(--primary)]' : 'text-[var(--sub)]'}`}>
                {va !== undefined ? (typeof va === 'number' ? va.toLocaleString() : String(va)) : '-'}
              </div>
              <div className={`py-1.5 text-center border-t border-[var(--line)] ${changed ? 'font-bold text-[var(--primary)]' : 'text-[var(--sub)]'}`}>
                {vb !== undefined ? (typeof vb === 'number' ? vb.toLocaleString() : String(vb)) : '-'}
              </div>
            </div>
          );
        })}

        <div className="py-2 font-bold text-[var(--ink)] border-t-2 border-[var(--primary)]">결과</div>
        <div className="py-2 text-center font-extrabold text-[var(--primary-dark)] border-t-2 border-[var(--primary)]">
          {a.primaryOutput}
        </div>
        <div className="py-2 text-center font-extrabold text-[var(--primary-dark)] border-t-2 border-[var(--primary)]">
          {b.primaryOutput}
        </div>
      </div>
    </Card>
  );
}
