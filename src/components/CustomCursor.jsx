import { useEffect, useRef } from 'react';

const TRAIL_LENGTH = 14;

export default function CustomCursor() {
  const dotRef   = useRef(null);
  const trailRef = useRef([]);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    const dot = dotRef.current;
    const trails = trailRef.current;

    let mouseX = 0, mouseY = 0;
    // Each trail point: { x, y }
    const points = Array.from({ length: TRAIL_LENGTH }, () => ({ x: 0, y: 0 }));

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Detect hoverable elements — enlarge dot
      const target = e.target;
      const isClickable = target.closest('a, button, [role="button"]');
      dot.style.transform = isClickable
        ? 'translate(-50%,-50%) scale(2.2)'
        : 'translate(-50%,-50%) scale(1)';
      dot.style.background = isClickable ? '#c9922a' : '#F2ECD1';
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    let frameId;
    const animate = () => {
      // Lead point follows mouse directly
      points[0].x += (mouseX - points[0].x) * 0.38;
      points[0].y += (mouseY - points[0].y) * 0.38;

      // Each subsequent point follows the one ahead of it — creates snake trail
      for (let i = 1; i < TRAIL_LENGTH; i++) {
        points[i].x += (points[i - 1].x - points[i].x) * 0.5;
        points[i].y += (points[i - 1].y - points[i].y) * 0.5;
      }

      // Dot sits at mouse position directly
      dot.style.left = `${mouseX}px`;
      dot.style.top  = `${mouseY}px`;

      // Update trail elements
      trails.forEach((el, i) => {
        if (!el) return;
        const p = points[i];
        const progress = 1 - i / TRAIL_LENGTH; // 1 at front, 0 at back
        const size     = Math.max(1.5, 6 * progress);
        const opacity  = progress * progress * 0.55; // quadratic fade
        el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%,-50%)`;
        el.style.width      = `${size}px`;
        el.style.height     = `${size}px`;
        el.style.opacity    = opacity;
        // Color shifts from burgundy at front to gold at back
        const t = 1 - progress;
        const r = Math.round(139 + (201 - 139) * t);
        const g = Math.round(26  + (146 - 26)  * t);
        const b = Math.round(26  + (42  - 26)  * t);
        el.style.background = `rgb(${r},${g},${b})`;
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
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: '50%',
          background: '#F2ECD1',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%,-50%)',
          transition: 'transform 0.2s cubic-bezier(.22,1,.36,1), background 0.2s ease',
          
        }}
      />

      {/* Trail dots */}
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <div
          key={i}
          ref={el => { trailRef.current[i] = el; }}
          style={{
            position: 'fixed',
            top: 0, left: 0,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9997,
            
            willChange: 'transform, opacity, width, height',
          }}
        />
      ))}
    </>
  );
}
