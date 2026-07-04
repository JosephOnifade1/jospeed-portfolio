import { useEffect, useRef } from 'react';

export function useMouseParallax(containerRef) {
  const state = useRef({ rawX: 0, rawY: 0, x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      state.current.rawX = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
      state.current.rawY = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [containerRef]);

  const tick = (lerpFactor = 0.06) => {
    const s = state.current;
    s.x += (s.rawX - s.x) * lerpFactor;
    s.y += (s.rawY - s.y) * lerpFactor;
    return { x: s.x, y: s.y };
  };

  return { tick };
}
