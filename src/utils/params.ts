import { saveProfile, getProfileValues, PROFILE_FIELDS, type ProfileEntry } from './profile';
import { saveHistory, incrementCalcUsage } from './calcHistory';

export function getParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};
  params.forEach((v, k) => { result[k] = v; });
  return result;
}

export function getParamsWithProfile(): {
  params: Record<string, string>;
  profileKeys: string[];
} {
  if (typeof window === 'undefined') return { params: {}, profileKeys: [] };

  const urlParams = getParams();
  if (Object.keys(urlParams).length > 0) {
    return { params: urlParams, profileKeys: [] };
  }

  const profile = getProfileValues();
  const result: Record<string, string> = {};
  const profileKeys: string[] = [];

  for (const [key, entry] of Object.entries(profile)) {
    result[key] = String(entry.value);
    profileKeys.push(key);
  }

  return { params: result, profileKeys };
}

export function getProfileFilledKeys(fieldNames: string[]): {
  values: Record<string, string>;
  filledKeys: string[];
} {
  if (typeof window === 'undefined') return { values: {}, filledKeys: [] };

  const urlParams = getParams();
  if (Object.keys(urlParams).length > 0) {
    return { values: {}, filledKeys: [] };
  }

  const profile = getProfileValues();
  const values: Record<string, string> = {};
  const filledKeys: string[] = [];

  for (const key of fieldNames) {
    if (profile[key]) {
      values[key] = String(profile[key].value);
      filledKeys.push(key);
    }
  }

  return { values, filledKeys };
}

export function getStaleProfileKeys(): string[] {
  if (typeof window === 'undefined') return [];
  const profile = getProfileValues();
  const staleMs = 6 * 30 * 24 * 60 * 60 * 1000;
  const stale: string[] = [];
  for (const [key, entry] of Object.entries(profile)) {
    if (Date.now() - new Date(entry.updatedAt).getTime() > staleMs) {
      stale.push(key);
    }
  }
  return stale;
}

export function getProfileEntries(): Record<string, ProfileEntry> {
  if (typeof window === 'undefined') return {};
  return getProfileValues();
}

export function setParams(
  state: Record<string, string | number | boolean>,
  options?: { calcId?: string; primaryOutput?: string },
) {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(state)) {
    if (v !== '' && v !== undefined && v !== null) params.set(k, String(v));
  }
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState(null, '', newUrl);

  const calcId = options?.calcId ?? window.location.pathname;
  saveProfile(state, calcId);

  if (options?.primaryOutput) {
    saveHistory(calcId, state, options.primaryOutput);
    incrementCalcUsage();
  }
}

export function hasParams(): boolean {
  if (typeof window === 'undefined') return false;
  return window.location.search.length > 1;
}
