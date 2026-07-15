'use client';

import { useState } from 'react';
import Card from './Card';

interface AiAnalysisProps {
  type: string;
  data: Record<string, unknown>;
  label?: string;
}

export default function AiAnalysis({ type, data, label }: AiAnalysisProps) {
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const analyze = async () => {
    setLoading(true);
    setError('');
    setAnalysis('');
    setDone(false);

    try {
      const res = await fetch('/api/ai-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, data }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'AI 분석에 실패했습니다.');
      }

      const result = await res.json();
      setAnalysis(result.analysis);
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'AI 분석에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={`!border-[1.5px] ${done ? '!border-[var(--primary)]' : '!border-[var(--line)]'}`}>
      {!done && !loading && (
        <>
          <div className="text-center">
            <div className="text-2xl mb-2">🤖</div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">AI가 계산 결과를 분석해 드려요</div>
            <div className="text-xs text-[var(--sub)] mb-3">맞춤형 절세 팁, 재테크 조언, 개선 방법을 알려드립니다</div>
            <button
              onClick={analyze}
              className="w-full py-3.5 border-0 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--violet)] text-white text-sm font-extrabold cursor-pointer shadow-lg transition-all hover:opacity-90 active:scale-[.985]"
            >
              🤖 {label || 'AI 분석 받기'}
            </button>
          </div>
          <div className="text-[10px] text-[var(--sub)] text-center mt-2">NVIDIA AI 기반 · 무료 · 개인정보 미저장</div>
        </>
      )}

      {loading && (
        <div className="text-center py-6">
          <div className="inline-block w-8 h-8 border-[3px] border-[var(--line)] border-t-[var(--primary)] rounded-full animate-spin mb-3" />
          <div className="text-sm font-bold text-[var(--ink)]">AI가 분석 중이에요...</div>
          <div className="text-xs text-[var(--sub)] mt-1">약 5~10초 정도 걸립니다</div>
        </div>
      )}

      {error && (
        <div className="text-center py-4">
          <div className="text-2xl mb-2">⚠️</div>
          <div className="text-sm text-[#E5484D] font-semibold mb-3">{error}</div>
          <button
            onClick={analyze}
            className="px-4 py-2 border-[1.5px] border-[var(--line)] rounded-xl text-sm font-bold text-[var(--sub)] cursor-pointer bg-white hover:bg-[var(--bg)]"
          >
            다시 시도
          </button>
        </div>
      )}

      {done && analysis && (
        <>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🤖</span>
            <span className="text-sm font-extrabold text-[var(--ink)]">AI 분석 결과</span>
            <span className="text-[10px] font-bold text-[var(--primary)] bg-[var(--primary-weak)] px-2 py-0.5 rounded-full">NVIDIA AI</span>
          </div>
          <div className="text-sm text-[#4E5968] leading-relaxed whitespace-pre-line">
            {analysis}
          </div>
          <div className="mt-3 pt-3 border-t border-[var(--line)] flex justify-between items-center">
            <div className="text-[10px] text-[var(--sub)]">AI 분석은 참고용이며, 전문가 상담을 권장합니다.</div>
            <button
              onClick={analyze}
              className="text-xs font-bold text-[var(--primary)] cursor-pointer bg-transparent border-0 hover:underline"
            >
              다시 분석
            </button>
          </div>
        </>
      )}
    </Card>
  );
}
