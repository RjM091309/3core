import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const SCROLL_DELAY_MS = 280;
const MAX_SCROLL_ATTEMPTS = 16;
const SCROLL_ATTEMPT_INTERVAL_MS = 60;

export function HashScrollAfterRoute() {
  const location = useLocation();
  const prevPath = useRef<string | null>(null);

  useEffect(() => {
    const prev = prevPath.current;

    if (location.pathname !== '/') {
      prevPath.current = location.pathname;
      return;
    }

    prevPath.current = location.pathname;

    const hash = location.hash;
    if (!hash) return;
    const id = hash.slice(1);
    if (!id) return;

    const cameFromOtherRoute = prev !== null && prev !== '/' && location.pathname === '/';
    const initialVisitWithHash = prev === null && !!hash;

    if (!cameFromOtherRoute && !initialVisitWithHash) return;

    let attempts = 0;
    let intervalId: number | null = null;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (intervalId) window.clearInterval(intervalId);
        intervalId = null;
        return;
      }
      attempts += 1;
      if (attempts >= MAX_SCROLL_ATTEMPTS) {
        if (intervalId) window.clearInterval(intervalId);
        intervalId = null;
      }
    };

    const t = window.setTimeout(() => {
      tryScroll();
      intervalId = window.setInterval(tryScroll, SCROLL_ATTEMPT_INTERVAL_MS);
    }, SCROLL_DELAY_MS);
    return () => window.clearTimeout(t);
  }, [location.pathname, location.hash]);

  return null;
}
