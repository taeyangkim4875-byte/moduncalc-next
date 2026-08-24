import { trackProfileSave } from '@/utils/analytics';

const STORAGE_KEY = 'modun_profile';
const SCHEMA_VERSION = 1;
const STALE_MS = 6 * 30 * 24 * 60 * 60 * 1000; // ~6 months

export interface ProfileEntry {
  value: number | string;
  unit: string;
  updatedAt: string;
  sourceCalcId: string;
}

interface ProfileStore {
  version: number;
  entries: Record<string, ProfileEntry>;
}

export interface ProfileFieldMeta {
  label: string;
  unit: string;
}

export const PROFILE_FIELDS: Record<string, ProfileFieldMeta> = {
  age: { label: '나이', unit: '세' },
  salary: { label: '연봉', unit: '만원' },
  income: { label: '월 소득', unit: '만원' },
  wage: { label: '월평균 임금', unit: '만원' },
  height: { label: '키', unit: 'cm' },
  weight: { label: '체중', unit: 'kg' },
  price: { label: '매매가', unit: '만원' },
  amount: { label: '대출 금액', unit: '만원' },
  jeonse: { label: '전세보증금', unit: '만원' },
  deposit: { label: '보증금', unit: '만원' },
  dependents: { label: '부양가족 수', unit: '명' },
  years: { label: '가입기간', unit: '년' },
  rate: { label: '금리', unit: '%' },
  term: { label: '대출기간', unit: '년' },
};

function read(): ProfileStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { version: SCHEMA_VERSION, entries: {} };
    const parsed = JSON.parse(raw) as ProfileStore;
    if (parsed.version !== SCHEMA_VERSION) {
      return { version: SCHEMA_VERSION, entries: {} };
    }
    return parsed;
  } catch {
    return { version: SCHEMA_VERSION, entries: {} };
  }
}

function write(store: ProfileStore): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch { /* storage full or blocked */ }
}

export function saveProfile(
  data: Record<string, string | number | boolean>,
  sourceCalcId: string,
): void {
  if (typeof window === 'undefined') return;
  const store = read();
  const now = new Date().toISOString();
  for (const [key, val] of Object.entries(data)) {
    if (!(key in PROFILE_FIELDS)) continue;
    if (val === '' || val === undefined || val === null) continue;
    const meta = PROFILE_FIELDS[key];
    store.entries[key] = {
      value: typeof val === 'boolean' ? (val ? 1 : 0) : val,
      unit: meta.unit,
      updatedAt: now,
      sourceCalcId,
    };
  }
  write(store);
  trackProfileSave();
}

export function getProfileValues(): Record<string, ProfileEntry> {
  if (typeof window === 'undefined') return {};
  return read().entries;
}

export function getProfileValue(key: string): ProfileEntry | undefined {
  if (typeof window === 'undefined') return undefined;
  return read().entries[key];
}

export function deleteProfileKey(key: string): void {
  if (typeof window === 'undefined') return;
  const store = read();
  delete store.entries[key];
  write(store);
}

export function clearProfile(): void {
  if (typeof window === 'undefined') return;
  try { localStorage.removeItem(STORAGE_KEY); } catch { /* ok */ }
}

export function isStale(entry: ProfileEntry): boolean {
  const age = Date.now() - new Date(entry.updatedAt).getTime();
  return age > STALE_MS;
}

export function profileCount(): number {
  if (typeof window === 'undefined') return 0;
  return Object.keys(read().entries).length;
}

export function hasSeenProfileNotice(): boolean {
  if (typeof window === 'undefined') return true;
  try { return localStorage.getItem('modun_profile_notice') === '1'; } catch { return true; }
}

export function markProfileNoticeSeen(): void {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem('modun_profile_notice', '1'); } catch { /* ok */ }
}

export function isFirstSave(): boolean {
  if (typeof window === 'undefined') return false;
  try { return localStorage.getItem('modun_profile_first_save') !== '1'; } catch { return false; }
}

export function markFirstSaveDone(): void {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem('modun_profile_first_save', '1'); } catch { /* ok */ }
}

export function exportProfile(): string {
  if (typeof window === 'undefined') return '{}';
  return JSON.stringify(read(), null, 2);
}

export function importProfile(json: string): boolean {
  try {
    const parsed = JSON.parse(json) as ProfileStore;
    if (!parsed.version || !parsed.entries) return false;
    parsed.version = SCHEMA_VERSION;
    write(parsed);
    return true;
  } catch {
    return false;
  }
}
