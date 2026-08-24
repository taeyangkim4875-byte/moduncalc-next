const BASE = 'https://moduncalc.com';

export function ogImageUrl(params: {
  title: string;
  result?: string;
  desc?: string;
  inputs?: string;
}): string {
  const u = new URL('/api/og', BASE);
  u.searchParams.set('title', params.title);
  if (params.result) u.searchParams.set('result', params.result);
  if (params.desc) u.searchParams.set('desc', params.desc);
  if (params.inputs) u.searchParams.set('inputs', params.inputs);
  return u.toString();
}
