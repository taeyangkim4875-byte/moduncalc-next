declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean>;

function send(event: string, params?: EventParams) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', event, params);
  }
}

export function trackCalcComplete(calculator: string, result: string) {
  send('calc_complete', { calculator, result });
}

export function trackSliderInteract(calculator: string, field: string) {
  send('slider_interact', { calculator, field });
}

export function trackChainClick(from: string, to: string) {
  send('chain_click', { from, to });
}

export function trackJourneyDepth(depth: number, path: string) {
  send('journey_depth', { depth, path });
}

export function trackProfileSave() {
  send('profile_save');
}

export function trackPrefillUsed(keys: string[]) {
  if (keys.length > 0) {
    send('prefill_used', { keys: keys.join(','), count: keys.length });
  }
}

export function trackReverseModeUsed(calculator: string) {
  send('reverse_mode_used', { calculator });
}

export function trackShareClick(method: string, calculator: string) {
  send('share_click', { method, calculator });
}

export function trackEmbedCopy(calculator: string) {
  send('embed_copy', { calculator });
}
