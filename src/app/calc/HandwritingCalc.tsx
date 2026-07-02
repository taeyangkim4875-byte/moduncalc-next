'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Card from '@/components/Card';

export default function HandwritingCalc() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null);
  const [recognized, setRecognized] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [history, setHistory] = useState<{ expr: string; result: string }[]>([]);
  const [penSize, setPenSize] = useState(6);
  const recogniserRef = useRef<any>(null);

  // Load recogniser dynamically (browser only)
  useEffect(() => {
    import('handwritten-mathematics-recogniser').then(mod => {
      recogniserRef.current = mod;
    }).catch(() => {
      console.warn('Recogniser failed to load');
    });
  }, []);

  // Init canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      const w = rect.width;
      const h = Math.max(280, Math.min(400, window.innerHeight * 0.4));

      // Save current drawing
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      canvas.width = w;
      canvas.height = h;

      // Restore drawing
      ctx.putImageData(imageData, 0, 0);

      ctx.strokeStyle = '#191F28';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = penSize;
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [penSize]);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      const touch = e.touches[0];
      return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    }
    return { x: (e as React.MouseEvent).clientX - rect.left, y: (e as React.MouseEvent).clientY - rect.top };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const pos = getPos(e);
    setIsDrawing(true);
    setLastPos(pos);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing || !lastPos) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const pos = getPos(e);

    ctx.strokeStyle = '#191F28';
    ctx.lineWidth = penSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    setLastPos(pos);
  };

  const endDraw = () => {
    setIsDrawing(false);
    setLastPos(null);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setRecognized('');
    setResult('');
  };

  const recognize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !recogniserRef.current) return;

    try {
      const mod = recogniserRef.current;
      // Try expression recogniser first
      let latex = '';
      try {
        latex = mod.HandwrittenExpressionRecogniserDNN.recognise(canvas);
      } catch {
        try {
          latex = mod.HandwrittenExpressionRecogniserCNN.recognise(canvas);
        } catch {
          // Fallback to digit recogniser
          const digit = mod.HandwrittenDigitRecogniserDNN.recognise(canvas);
          latex = String(digit);
        }
      }

      if (!latex || latex.trim() === '') {
        setRecognized('인식 실패');
        setResult('다시 그려주세요');
        return;
      }

      setRecognized(latex);

      // Convert latex to evaluable expression
      let expr = latex
        .replace(/\\times/g, '*')
        .replace(/\\sqrt\{([^}]+)\}/g, 'Math.sqrt($1)')
        .replace(/\\sqrt/g, 'Math.sqrt')
        .replace(/\s+/g, '');

      // Evaluate
      try {
        // Safety check - only allow numbers, operators, parens, Math functions
        if (/^[0-9+\-*/.()Math.sqrt\s]+$/.test(expr)) {
          const evalResult = Function('"use strict"; return (' + expr + ')')();
          const formatted = typeof evalResult === 'number'
            ? (Number.isInteger(evalResult) ? evalResult.toLocaleString('ko-KR') : parseFloat(evalResult.toFixed(6)).toLocaleString('ko-KR'))
            : String(evalResult);
          setResult(formatted);
          setHistory(prev => [{ expr: latex.replace(/\\times/g, '×').replace(/\\sqrt/g, '√'), result: formatted }, ...prev.slice(0, 9)]);
        } else {
          setResult('계산할 수 없는 수식');
        }
      } catch {
        setResult('계산 오류');
      }
    } catch {
      setRecognized('인식 실패');
      setResult('다시 그려주세요');
    }
  }, []);

  return (
    <>
      {/* 캔버스 영역 */}
      <Card className="!p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[var(--sub)]">펜 굵기</span>
            {[4, 6, 8].map(s => (
              <button
                key={s}
                onClick={() => setPenSize(s)}
                className={`w-7 h-7 rounded-full border-[1.5px] flex items-center justify-center cursor-pointer transition-all ${penSize === s ? 'border-[var(--primary)] bg-[var(--primary-weak)]' : 'border-[var(--line)] bg-white'}`}
              >
                <span className="rounded-full bg-[var(--ink)]" style={{ width: s + 2, height: s + 2 }} />
              </button>
            ))}
          </div>
          <button
            onClick={clearCanvas}
            className="px-3 py-1.5 text-xs font-bold text-[var(--sub)] border border-[var(--line)] rounded-lg bg-white hover:bg-[var(--bg)] cursor-pointer"
          >
            지우기
          </button>
        </div>

        <div className="relative border-2 border-dashed border-[var(--line)] rounded-xl overflow-hidden bg-white">
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
          {!recognized && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="text-[var(--sub)] text-sm font-medium opacity-50">여기에 수식을 그려주세요</p>
            </div>
          )}
        </div>

        <button
          onClick={recognize}
          className="w-full mt-3 py-3.5 border-0 rounded-xl bg-[var(--primary)] text-white text-base font-extrabold cursor-pointer shadow-[var(--shadow-h)] transition-all hover:bg-[var(--primary-dark)] active:scale-[.985]"
        >
          ✨ 인식하고 계산하기
        </button>
      </Card>

      {/* 결과 */}
      {(recognized || result) && (
        <Card>
          <div className="text-center">
            {recognized && (
              <div className="text-sm text-[var(--sub)] font-semibold mb-1">
                인식된 수식: <span className="text-[var(--ink)] font-bold">{recognized.replace(/\\times/g, '×').replace(/\\sqrt/g, '√')}</span>
              </div>
            )}
            {result && (
              <div className="bg-[var(--primary-weak)] rounded-[14px] p-5 mt-2">
                <div className="text-xs text-[var(--primary-dark)] font-bold mb-1">계산 결과</div>
                <div className="text-[36px] font-extrabold text-[var(--primary-dark)] tracking-tight">= {result}</div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* 지원 수식 안내 */}
      <Card>
        <div className="text-[13px] font-extrabold mb-2">✏️ 지원하는 수식</div>
        <div className="grid grid-cols-2 gap-2 text-[13px]">
          <div className="bg-[var(--bg)] rounded-lg p-2.5 text-center">
            <div className="font-bold text-[var(--ink)]">숫자</div>
            <div className="text-[var(--sub)] text-xs mt-0.5">0 ~ 9</div>
          </div>
          <div className="bg-[var(--bg)] rounded-lg p-2.5 text-center">
            <div className="font-bold text-[var(--ink)]">사칙연산</div>
            <div className="text-[var(--sub)] text-xs mt-0.5">+ - × ÷</div>
          </div>
          <div className="bg-[var(--bg)] rounded-lg p-2.5 text-center">
            <div className="font-bold text-[var(--ink)]">괄호</div>
            <div className="text-[var(--sub)] text-xs mt-0.5">( )</div>
          </div>
          <div className="bg-[var(--bg)] rounded-lg p-2.5 text-center">
            <div className="font-bold text-[var(--ink)]">제곱근</div>
            <div className="text-[var(--sub)] text-xs mt-0.5">√</div>
          </div>
        </div>
        <div className="text-[11px] text-[var(--sub)] mt-3 text-center leading-relaxed">
          수식을 하나씩 또박또박 크게 그려주세요.<br/>
          인식이 잘 안 되면 지우고 다시 그려보세요.
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
          AI가 브라우저에서 직접 인식합니다. 서버로 데이터가 전송되지 않아요.<br/>
          복잡한 수식은 인식률이 낮을 수 있습니다.
        </div>
      </footer>
    </>
  );
}
