'use client';

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-[80px] right-4 z-40 w-10 h-10 rounded-full bg-white border border-[var(--line)] shadow-lg flex items-center justify-center text-[var(--sub)] text-lg cursor-pointer hover:bg-[var(--primary-weak)] hover:text-[var(--primary)] transition-all active:scale-90 lg:right-6"
      aria-label="맨 위로"
    >
      ↑
    </button>
  );
}
