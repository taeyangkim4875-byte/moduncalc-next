export const won = (n: number): string =>
  Math.round(n).toLocaleString('ko-KR') + '원';

export const manWon = (n: number): string =>
  Math.round(n / 10000).toLocaleString('ko-KR') + '만';

export const fmtPct = (p: number): string =>
  p < 1 ? p.toFixed(2) : p < 10 ? p.toFixed(1) : Math.round(p).toString();

export const fmtSalary = (s: number): string => {
  if (s >= 10000) {
    const uk = Math.floor(s / 10000);
    const rest = s % 10000;
    return rest > 0 ? `${uk}억 ${rest.toLocaleString('ko-KR')}만` : `${uk}억`;
  }
  return `${s.toLocaleString('ko-KR')}만`;
};
