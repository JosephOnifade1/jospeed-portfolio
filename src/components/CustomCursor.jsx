import { useEffect, useRef } from 'react';

const TRAIL_LENGTH = 12;

export default function CustomCursor() {
  const dotRef   = useRef(null);
  const trailRef = useRef([]);

  useEffect(() => {
    if (window.matchMedia('(hover: none), (prefers-reduced-motion: reduce)').matches) return;

    const dot = dotRef.current;
    const trails = trailRef.current;
    if (!dot) return;

    let mouseX = 0, mouseY = 0;
    const points = Array.from({ length: TRAIL_LENGTH }, () => ({ x: 0, y: 0 }));

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const target = e.target;
      const isClickable = target && target.closest ? target.closest('a, button, [role="button"]') : null;
      dot.style.transform = isClickable
        ? 'translate(-50%,-50%) scale(2.2)'
        : 'translate(-50%,-50%) scale(1)';
      dot.style.background = isClickable ? '#D8F36A' : '#F5F4EE';
      dot.style.boxShadow = isClickable ? '0 0 16px rgba(216, 243, 106, 0.6)' : 'none';
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    let frameId;
    const animate = () => {
      points[0].x += (mouseX - points[0].x) * 0.4;
      points[0].y += (mouseY - points[0].y) * 0.4;

      for (let i = 1; i < TRAIL_LENGTH; i++) {
        points[i].x += (points[i - 1].x - points[i].x) * 0.45;
        points[i].y += (points[i - 1].y - points[i].y) * 0.45;
      }

      dot.style.left = `${mouseX}px`;
      dot.style.top  = `${mouseY}px`;

      trails.forEach((el, i) => {
        if (!el) return;
        const p = points[i];
        const progress = 1 - i / TRAIL_LENGTH;
        const size     = Math.max(1.5, 5 * progress);
        const opacity  = progress * progress * 0.45;
        el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%,-50%)`;
        el.style.width      = `${size}px`;
        el.style.height     = `${size}px`;
        el.style.opacity    = opacity;
        el.style.background = '#D8F36A';
      });

      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      {/* Main dot */}
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#D8F36A',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%,-50%)',
          transition: 'transform 0.2s cubic-bezier(.22,1,.36,1), background 0.2s ease, box-shadow 0.2s ease',
        }}
      />

      {/* Trail dots */}
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <div
          key={i}
          ref={el => { trailRef.current[i] = el; }}
          className="custom-cursor-trail"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9997,
            willChange: 'transform, opacity, width, height',
          }}
        />
      ))}
      <style>{`
        @media (hover: none), (prefers-reduced-motion: reduce) {
          .custom-cursor-dot, .custom-cursor-trail { display: none !important; }
        }
      `}</style>
    </>
  );
}
