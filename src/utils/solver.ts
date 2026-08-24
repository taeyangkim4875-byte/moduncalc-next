export interface SolveResult {
  value: number;
  converged: boolean;
  iterations: number;
}

export function bisect(
  fn: (x: number) => number,
  lo: number,
  hi: number,
  maxIter = 60,
  tol = 1e-6,
): SolveResult {
  let fLo = fn(lo);
  let fHi = fn(hi);

  if (fLo * fHi > 0) {
    return { value: NaN, converged: false, iterations: 0 };
  }

  let mid = lo;
  let i = 0;
  for (; i < maxIter; i++) {
    mid = (lo + hi) / 2;
    const fMid = fn(mid);
    if (Math.abs(fMid) < tol || (hi - lo) / 2 < tol * Math.max(1, Math.abs(mid))) {
      return { value: mid, converged: true, iterations: i + 1 };
    }
    if (fMid * fLo < 0) {
      hi = mid;
      fHi = fMid;
    } else {
      lo = mid;
      fLo = fMid;
    }
  }
  return { value: mid, converged: false, iterations: i };
}

export function secantWithFallback(
  fn: (x: number) => number,
  x0: number,
  x1: number,
  lo: number,
  hi: number,
  maxIter = 60,
  tol = 1e-6,
): SolveResult {
  let a = x0, b = x1;
  let fa = fn(a), fb = fn(b);

  for (let i = 0; i < maxIter; i++) {
    if (Math.abs(fb) < tol) {
      return { value: b, converged: true, iterations: i + 1 };
    }
    const denom = fb - fa;
    if (Math.abs(denom) < 1e-15) break;
    const c = b - fb * (b - a) / denom;
    a = b; fa = fb;
    b = c; fb = fn(c);
    if (b < lo || b > hi) break;
  }

  return bisect(fn, lo, hi, maxIter, tol);
}
