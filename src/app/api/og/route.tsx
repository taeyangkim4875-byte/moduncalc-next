import { ImageResponse } from 'next/og';
import { type NextRequest } from 'next/server';

export const runtime = 'edge';

const fontData = fetch(
  new URL('./Pretendard-Bold.ttf', import.meta.url),
).then((res) => res.arrayBuffer());

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get('title') || '모든 계산기';
  const result = searchParams.get('result') || '';
  const desc = searchParams.get('desc') || '';
  const inputs = searchParams.get('inputs') || '';

  const font = await fontData;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #F8FAFC 0%, #EEF2FF 100%)',
          padding: '60px',
          fontFamily: 'Pretendard',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: '#3182F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              color: 'white',
            }}
          >
            =
          </div>
          <div style={{ fontSize: '20px', color: '#8B95A1' }}>
            moduncalc.com
          </div>
        </div>

        <div
          style={{
            fontSize: '44px',
            color: '#191F28',
            lineHeight: 1.3,
            marginBottom: '16px',
          }}
        >
          {title}
        </div>

        {inputs && (
          <div
            style={{
              fontSize: '22px',
              color: '#6B7684',
              marginBottom: '32px',
              lineHeight: 1.5,
            }}
          >
            {inputs}
          </div>
        )}

        {result && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: 'white',
              borderRadius: '20px',
              padding: '32px 40px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              marginTop: 'auto',
              border: '2px solid #3182F6',
            }}
          >
            {desc && (
              <div style={{ fontSize: '18px', color: '#8B95A1', marginBottom: '8px' }}>
                {desc}
              </div>
            )}
            <div style={{ fontSize: '56px', color: '#1B64DA', lineHeight: 1.2 }}>
              {result}
            </div>
          </div>
        )}

        {!result && desc && (
          <div
            style={{
              fontSize: '26px',
              color: '#4E5968',
              marginTop: 'auto',
              lineHeight: 1.6,
            }}
          >
            {desc}
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Pretendard',
          data: font,
          weight: 700,
          style: 'normal',
        },
      ],
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
      },
    },
  );
}
