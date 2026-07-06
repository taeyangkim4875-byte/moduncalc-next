// URL 파라미터 ↔ 상태 동기화 유틸리티

export function getParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};
  params.forEach((v, k) => { result[k] = v; });
  return result;
}

export function setParams(state: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(state)) {
    if (v !== '' && v !== undefined && v !== null) params.set(k, String(v));
  }
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState(null, '', newUrl);
}

export function hasParams(): boolean {
  if (typeof window === 'undefined') return false;
  return window.location.search.length > 1;
}
