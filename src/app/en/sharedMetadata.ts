/**
 * 영문 페이지가 공유하는 openGraph 기본값.
 *
 * Next 의 metadata 는 얕은 병합이라, 하위 세그먼트가 openGraph 를 정의하면
 * 상위의 openGraph 는 통째로 버려집니다. 그래서 루트 레이아웃의
 * siteName("모든 계산기")·locale(ko_KR) 이 영문 페이지로 새는 걸 막으려면
 * 자체 openGraph 를 쓰는 페이지마다 이 값을 펼쳐 넣어야 합니다.
 *
 * 참고: node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md
 *       "Merging — Overwriting fields"
 */
export const EN_OPEN_GRAPH = {
  type: "website" as const,
  locale: "en_US",
  siteName: "Moduncalc",
};
