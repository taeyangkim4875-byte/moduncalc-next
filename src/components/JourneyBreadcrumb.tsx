'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCalc } from '@/data/calculators';
import { getChainLinks } from '@/data/chains';

interface JourneyStep {
  href: string;
  title: string;
  icon: string;
}

const JOURNEY_KEY = 'modun_journey';

function loadJourney(): JourneyStep[] {
  try {
    return JSON.parse(sessionStorage.getItem(JOURNEY_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveJourney(journey: JourneyStep[]) {
  try {
    sessionStorage.setItem(JOURNEY_KEY, JSON.stringify(journey));
  } catch {}
}

export default function JourneyBreadcrumb({
  currentHref,
}: {
  currentHref: string;
}) {
  const [journey, setJourney] = useState<JourneyStep[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const from = params.get('_from');
    const calc = getCalc(currentHref);
    if (!calc) return;

    const step: JourneyStep = {
      href: currentHref,
      title: calc.title,
      icon: calc.icon,
    };
    const existing = loadJourney();

    let updated: JourneyStep[];
    if (from) {
      const fromIdx = existing.findIndex(s => s.href === from);
      if (fromIdx >= 0) {
        updated = existing.slice(0, fromIdx + 1);
        if (updated[updated.length - 1]?.href !== currentHref) {
          updated.push(step);
        }
      } else {
        const fromCalc = getCalc(from);
        updated = fromCalc
          ? [
              { href: from, title: fromCalc.title, icon: fromCalc.icon },
              step,
            ]
          : [step];
      }
    } else {
      const hasLinks = getChainLinks(currentHref).length > 0;
      updated = hasLinks ? [step] : [];
    }

    saveJourney(updated);
    setJourney(updated);
  }, [currentHref]);

  if (journey.length < 2) return null;

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mb-3 px-1 text-xs scrollbar-hide">
      {journey.map((step, i) => (
        <span key={step.href} className="flex items-center gap-1.5 shrink-0">
          {i > 0 && <span className="text-[var(--sub)]">→</span>}
          {step.href === currentHref ? (
            <span className="font-bold text-[var(--primary-dark)] bg-[var(--primary-weak)] px-2 py-1 rounded-lg">
              {step.icon} {step.title}
            </span>
          ) : (
            <Link
              href={step.href}
              className="text-[var(--sub)] hover:text-[var(--primary)] px-2 py-1 rounded-lg hover:bg-[var(--primary-weak)] transition-colors"
            >
              {step.icon} {step.title}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
