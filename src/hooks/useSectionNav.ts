import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function useSectionNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (hash: string) => {
      const h = hash.startsWith('#') ? hash : `#${hash}`;
      const id = h.slice(1);
      if (!id) return;

      if (location.pathname !== '/') {
        navigate({ pathname: '/', hash: h });
        return;
      }

      void navigate({ pathname: '/', hash: h }, { replace: true });
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
    },
    [navigate, location.pathname]
  );
}
