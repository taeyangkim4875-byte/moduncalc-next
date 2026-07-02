'use client';

import { useRef, useState, useEffect } from 'react';
import Card, { SectionTitle } from '@/components/Card';

// MyScript REST API로 수학 인식
const APP_KEY = 'a362edb6-2971-4ddd-855a-06376d8b15e1';
const HMAC_KEY = '10192909-b0b0-46d4-9e7d-62059a7dd300';
const API_URL = 'https://cloud.myscript.com/api/v4.0/iink/batch';

interface StrokeData {
  x: number[];
  y: number[];
}

export default function HandwritingCalc() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null);
  const [strokes, setStrokes] = useState<StrokeData[]>([]);
  const [currentStroke, setCurrentStroke] = useState<StrokeData>({ x: [], y: [] });
  const [recognized, setRecognized] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<{ expr: string; result: string }[]>([]);

  // 캔버스 초기화
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const w = canvas.parentElement!.getBoundingClientRect().width;
      canvas.width = w;
      canvas.height = Math.max(250, Math.min(350, window.innerHeight * 0.35));
      redrawStrokes();
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const redrawStrokes = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#191F28';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    [...strokes, currentStroke].forEach(s => {
      if (s.x.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(s.x[0], s.y[0]);
      for (let i = 1; i < s.x.length; i++) ctx.lineTo(s.x[i], s.y[i]);
      ctx.stroke();
    });
  };

  useEffect(() => { redrawStrokes(); }, [strokes]);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    if ('touches' in e) return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    return { x: (e as React.MouseEvent).clientX - rect.left, y: (e as React.MouseEvent).clientY - rect.top };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const pos = getPos(e);
    setIsDrawing(true);
    setLastPos(pos);
    setCurrentStroke({ x: [pos.x], y: [pos.y] });
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing) return;
    const pos = getPos(e);
    const ctx = canvasRef.current!.getContext('2d')!;
    ctx.strokeStyle = '#191F28';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    if (lastPos) {
      ctx.beginPath();
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
    setLastPos(pos);
    setCurrentStroke(prev => ({ x: [...prev.x, pos.x], y: [...prev.y, pos.y] }));
  };

  const endDraw = () => {
    if (currentStroke.x.length > 1) {
      setStrokes(prev => [...prev, currentStroke]);
    }
    setCurrentStroke({ x: [], y: [] });
    setIsDrawing(false);
    setLastPos(null);
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current!.getContext('2d')!;
    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    setStrokes([]);
    setCurrentStroke({ x: [], y: [] });
    setRecognized('');
    setResult('');
  };

  const undoStroke = () => {
    setStrokes(prev => prev.slice(0, -1));
    setRecognized('');
    setResult('');
  };

  // MyScript REST API로 인식
  const recognize = async () => {
    if (strokes.length === 0) return;

    setLoading(true);
    try {
      // 스트로크 데이터 구성
      const strokeGroups = strokes.map(s => ({
        pointerType: 'PEN' as const,
        x: s.x,
        y: s.y,
      }));

      const body = JSON.stringify({
        configuration: {
          math: { mimeTypes: ['application/x-latex'], solver: { enable: true } },
          lang: 'en_US',
        },
        xDPI: 96,
        yDPI: 96,
        contentType: 'Math',
        strokeGroups: [{ strokes: strokeGroups }],
      });

      // HMAC 계산 (message = request body)
      const { computeHmac } = await import('iink-ts');
      const hmac = await computeHmac(body, APP_KEY, HMAC_KEY);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'applicationKey': APP_KEY,
          'hmac': hmac,
          'Accept': 'application/json,application/x-latex',
        },
        body,
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        console.error('API response:', response.status, errorText);
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const latex = data?.exports?.['application/x-latex'] || '';

      if (latex) {
        setRecognized(latex);

        // LaTeX → 계산 가능한 수식으로 변환
        let expr = latex
          .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)')
          .replace(/\\sqrt\{([^}]+)\}/g, 'Math.sqrt($1)')
          .replace(/\\times/g, '*')
          .replace(/\\div/g, '/')
          .replace(/\\cdot/g, '*')
          .replace(/\^/g, '**')
          .replace(/\\left\(/g, '(')
          .replace(/\\right\)/g, ')')
          .replace(/\{/g, '(')
          .replace(/\}/g, ')')
          .replace(/\\/g, '');

        try {
          const sanitized = expr.replace(/Math\.\w+/g, '').replace(/[0-9+\-*/.()%\s]/g, '');
          if (sanitized.length === 0 || /^\*+$/.test(sanitized)) {
            const val = Function('"use strict"; return (' + expr + ')')();
            if (typeof val === 'number' && isFinite(val)) {
              const formatted = Number.isInteger(val) ? val.toLocaleString('ko-KR') : parseFloat(val.toFixed(6)).toLocaleString('ko-KR');
              setResult(formatted);
              const displayExpr = latex.replace(/\\times/g, '×').replace(/\\div/g, '÷').replace(/\\cdot/g, '·').replace(/\\frac/g, '').replace(/[{}\\]/g, '');
              setHistory(prev => [{ expr: displayExpr, result: formatted }, ...prev.slice(0, 9)]);
            } else {
              setResult('계산할 수 없는 수식');
            }
          } else {
            setResult(expr);
          }
        } catch {
          setResult('인식됨: ' + latex);
        }
      } else {
        setRecognized('인식 실패');
        setResult('다시 그려주세요');
      }
    } catch (err) {
      console.error(err);
      setRecognized('');
      setResult('네트워크 오류가 발생했어요. 다시 시도해 주세요.');
    }
    setLoading(false);
  };

  return (
    <>
      {/* 캔버스 */}
      <Card className="!p-3">
        <div className="border-2 border-dashed border-[var(--line)] rounded-xl overflow-hidden bg-white relative">
          <canvas
            ref={canvasRef}
            className="block w-full touch-none"
            style={{ cursor: 'crosshair' }}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={endDraw}
            onMouseLeave={endDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={endDraw}
          />
          {strokes.length === 0 && !isDrawing && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-40">
              <span className="text-5xl mb-2">✍️</span>
              <span className="text-sm font-semibold">수식을 자유롭게 그려주세요</span>
              <span className="text-xs mt-1">예: 2+3, 12×4, √16</span>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-2.5">
          <button
            onClick={recognize}
            disabled={loading || strokes.length === 0}
            className="flex-1 py-3.5 rounded-xl bg-[var(--primary)] text-white font-extrabold border-0 cursor-pointer text-sm hover:bg-[var(--primary-dark)] active:scale-[.98] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? '인식 중...' : '✨ 인식하고 계산하기'}
          </button>
          <button onClick={undoStroke} disabled={strokes.length === 0} className="px-3 py-3.5 rounded-xl bg-[var(--bg)] text-[var(--sub)] font-bold border-0 cursor-pointer text-sm hover:bg-[var(--line)] disabled:opacity-30">↩</button>
          <button onClick={clearCanvas} className="px-3 py-3.5 rounded-xl bg-[#FFE5E5] text-[#E5484D] font-bold border-0 cursor-pointer text-sm">C</button>
        </div>
      </Card>

      {/* 결과 */}
      {(recognized || result) && (
        <Card>
          <div className="text-center">
            {recognized && recognized !== '인식 실패' && (
              <div className="text-sm text-[var(--sub)] font-semibold mb-1">
                인식: <span className="text-[var(--ink)] font-bold">{recognized}</span>
              </div>
            )}
            <div className="bg-[var(--primary-weak)] rounded-[14px] p-5 mt-2">
              <div className="text-xs text-[var(--primary-dark)] font-bold mb-1">
                {recognized === '인식 실패' || !recognized ? '안내' : '계산 결과'}
              </div>
              <div className={`font-extrabold tracking-tight ${recognized === '인식 실패' || !recognized ? 'text-[#B26A00] text-base' : 'text-[var(--primary-dark)] text-[32px]'}`}>
                {recognized === '인식 실패' || !recognized ? result : `= ${result}`}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* 사용법 */}
      <Card>
        <SectionTitle num="💡">이렇게 그려보세요</SectionTitle>
        <div className="grid grid-cols-2 gap-2 text-[13px]">
          {[
            { sym: '2 + 3', desc: '덧셈' },
            { sym: '12 × 4', desc: '곱셈' },
            { sym: '√16', desc: '제곱근' },
            { sym: '5²', desc: '거듭제곱' },
            { sym: '¹²⁄₄', desc: '분수' },
            { sym: '( ) ', desc: '괄호' },
          ].map((ex, i) => (
            <div key={i} className="bg-[var(--bg)] rounded-lg p-2.5 text-center">
              <div className="font-bold text-[var(--ink)] text-base">{ex.sym}</div>
              <div className="text-[var(--sub)] text-xs mt-0.5">{ex.desc}</div>
            </div>
          ))}
        </div>
        <div className="text-[11px] text-[var(--sub)] mt-3 text-center leading-relaxed">
          수식 전체를 한 번에 그려주세요 (한 글자씩 X)<br/>
          또박또박 크게 그릴수록 정확해요
        </div>
      </Card>

      {/* 히스토리 */}
      {history.length > 0 && (
        <Card>
          <div className="text-[13px] font-extrabold mb-2">📋 계산 기록</div>
          <div className="flex flex-col gap-1.5">
            {history.map((h, i) => (
              <div key={i} className="flex justify-between items-center py-2 px-2.5 bg-[var(--bg)] rounded-lg text-sm">
                <span className="text-[var(--sub)] font-semibold">{h.expr}</span>
                <span className="font-extrabold text-[var(--primary-dark)]">= {h.result}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">
          MyScript AI 기반 수학 인식 · 서버에 스트로크 데이터만 전송되며, 이미지는 저장되지 않습니다.
        </div>
      </footer>
    </>
  );
}
