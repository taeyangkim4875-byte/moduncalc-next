import { NextRequest, NextResponse } from 'next/server';

/**
 * trailing slash 정리는 여기서 하지 않는다.
 *
 * next.config.ts 의 trailingSlash: false 로 Next 가 이미 308 로 처리하고 있고,
 * 그 처리가 이 함수보다 먼저 일어난다(응답이 전부 308 이며, 여기서 쓰던 301 은
 * 한 번도 관측되지 않았다). 즉 아래 코드는 도달하지 않는 죽은 코드였다.
 *
 * 남겨두면 위험한 이유도 있었다. pathname 이 '//' 인 경우
 * pathname.replace(/\/+$/, '') 가 빈 문자열이 되어 경로 없는 리디렉션을 만들 수 있고,
 * 이는 Search Console 의 '리디렉션 오류'로 잡히는 유형이다.
 * Next 의 기본 처리에 맡기는 편이 안전하다.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const response = NextResponse.next();

  if (pathname.startsWith('/embed')) {
    response.headers.set('X-Frame-Options', 'ALLOWALL');
    response.headers.set('Content-Security-Policy', "frame-ancestors *");
  } else {
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon|icons|sw\\.js|manifest).*)'],
};
