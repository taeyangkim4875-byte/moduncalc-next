import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[560px] mx-auto px-4 py-3">
      {children}
      <div style={{ textAlign: 'center', padding: '16px 0 8px', fontSize: '12px' }}>
        <a
          href="https://moduncalc.com"
          target="_blank"
          rel="noopener"
          style={{ color: '#3182F6', fontWeight: 700, textDecoration: 'none' }}
        >
          모든 계산기
        </a>
        <span style={{ color: '#8B95A1', marginLeft: '4px' }}>에서 더 많은 계산기를 확인하세요</span>
      </div>
    </div>
  );
}
