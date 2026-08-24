'use client';

import { useState, useEffect } from 'react';
import { getProfileValues, hasSeenProfileNotice, markProfileNoticeSeen, PROFILE_FIELDS } from '@/utils/profile';
import { hasParams } from '@/utils/params';

interface UseProfileFillResult {
  filledKeys: string[];
  showNotice: boolean;
  dismissNotice: () => void;
}

export function useProfileFill(fieldNames: string[]): UseProfileFillResult {
  const [filledKeys, setFilledKeys] = useState<string[]>([]);
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    if (hasParams()) return;

    const profile = getProfileValues();
    const filled: string[] = [];
    for (const key of fieldNames) {
      if (profile[key] && key in PROFILE_FIELDS) {
        filled.push(key);
      }
    }
    setFilledKeys(filled);

    if (filled.length > 0 && !hasSeenProfileNotice()) {
      setShowNotice(true);
    }
  }, [fieldNames]);

  function dismissNotice() {
    markProfileNoticeSeen();
    setShowNotice(false);
  }

  return { filledKeys, showNotice, dismissNotice };
}
