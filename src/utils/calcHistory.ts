const STORAGE_KEY = 'modun_history';
const MAX_ENTRIES = 50;
const SCHEMA_VERSION = 1;

export interface HistoryEntry {
  calcId: string;
  inputs: Record<string, string | number>;
  primaryOutput: string;
  timestamp: string;
}

interface HistoryStore {
  version: number;
  entries: HistoryEntry[];
}

function read(): HistoryStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { version: SCHEMA_VERSION, entries: [] };
    const parsed = JSON.parse(raw) as HistoryStore;
    if (parsed.version !== SCHEMA_VERSION) {
      return { version: SCHEMA_VERSION, entries: [] };
    }
    return parsed;
  } catch {
    return { version: SCHEMA_VERSION, entries: [] };
  }
}

function write(store: HistoryStore): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch { /* storage full or blocked */ }
}

export function saveHistory(
  calcId: string,
  inputs: Record<string, string | number | boolean>,
  primaryOutput: string,
): void {
  if (typeof window === 'undefined') return;
  const store = read();
  const cleaned: Record<string, string | number> = {};
  for (const [k, v] of Object.entries(inputs)) {
    if (typeof v === 'boolean') cleaned[k] = v ? 1 : 0;
    else cleaned[k] = v;
  }
  store.entries.unshift({
    calcId,
    inputs: cleaned,
    primaryOutput,
    timestamp: new Date().toISOString(),
  });
  if (store.entries.length > MAX_ENTRIES) {
    store.entries = store.entries.slice(0, MAX_ENTRIES);
  }
  write(store);
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  return read().entries;
}

export function getHistoryForCalc(calcId: string): HistoryEntry[] {
  return getHistory().filter(e => e.calcId === calcId);
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  try { localStorage.removeItem(STORAGE_KEY); } catch { /* ok */ }
}

export function exportHistory(): string {
  if (typeof window === 'undefined') return '[]';
  return JSON.stringify(read(), null, 2);
}

export function importHistory(json: string): boolean {
  try {
    const parsed = JSON.parse(json) as HistoryStore;
    if (!Array.isArray(parsed.entries)) return false;
    parsed.version = SCHEMA_VERSION;
    write(parsed);
    return true;
  } catch {
    return false;
  }
}

export function calcUsageCount(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const raw = localStorage.getItem('modun_calc_count');
    return raw ? parseInt(raw, 10) : 0;
  } catch { return 0; }
}

export function incrementCalcUsage(): void {
  if (typeof window === 'undefined') return;
  try {
    const count = calcUsageCount() + 1;
    localStorage.setItem('modun_calc_count', String(count));
  } catch { /* ok */ }
}
