/**
 * 한국어 페이지가 공유하는 openGraph 기본값.
 *
 * Next 의 metadata 는 얕은 병합이라, 페이지가 openGraph 를 정의하면 루트
 * 레이아웃의 openGraph 는 통째로 버려집니다. 그래서 각 페이지가 og:title /
 * og:description / og:url 만 적어두면 og:type·og:site_name·og:locale 이
 * 전부 사라집니다. 카카오톡·슬랙 미리보기에 사이트 이름이 안 뜨는 원인입니다.
 *
 * 자체 openGraph 를 쓰는 페이지는 이 값을 먼저 펼친 뒤 자기 필드를 덮어쓰세요.
 *
 * 참고: node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md
 *       "Merging — Overwriting fields"
 */
export const KO_OPEN_GRAPH = {
  type: "website" as const,
  locale: "ko_KR",
  siteName: "모든 계산기",
};
