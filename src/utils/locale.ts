/**
 * 영문 영역 판별.
 *
 * 공통 UI(푸터, 작성자 블록, 공유 버튼 등)는 한국어 페이지와 영문 페이지에
 * 똑같이 붙기 때문에, 경로를 보고 문구를 갈라줘야 한다.
 * 이 판별이 빠져 있어서 영문 가이드 31편 전부에 한국어 푸터가 노출되고 있었다.
 */
export function isEnPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return pathname === '/en' || pathname.startsWith('/en/');
}
