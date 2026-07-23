import { useEffect, useRef, useState } from 'react';

// Custom "Hire me" cursor label — appears offset to bottom-right of the
// real cursor (like the screenshot), only when hovering any form element.

export default function FormCursor() {
  const labelRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const target = useRef({ x: -400, y: -400 });
  const smooth = useRef({ x: -400, y: -400 });
  const frameRef = useRef(null);

  useEffect(() => {
    const el = labelRef.current;
    if (!el) return;

    const isForm = (node) =>
      node.closest('form, input, textarea, select, [data-form-cursor]');

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
      setVisible(!!isForm(e.target));
    };

    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    const animate = () => {
      // Soft follow with slight lag — feels alive, not mechanical
      smooth.current.x += (target.current.x - smooth.current.x) * 0.12;
      smooth.current.y += (target.current.y - smooth.current.y) * 0.12;

      // Offset: 14px right, 14px down from cursor tip — exactly like screenshot
      el.style.transform = `translate(${smooth.current.x + 14}px, ${smooth.current.y + 14}px)`;
      frameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={labelRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9990,
          opacity: visible ? 1 : 0,
          scale: visible ? '1' : '0.85',
          transition: 'opacity 0.18s ease, scale 0.18s cubic-bezier(.22,1,.36,1)',
          willChange: 'transform',
        }}
      >
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '8px 16px',
          borderRadius: 999,
          background: '#F2ECD1',
          color: '#4D2622',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: '0.01em',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 16px rgba(0,0,0,0.18), 0 1px 0 rgba(255,255,255,0.5) inset',
          userSelect: 'none',
        }}>
          Hire me
        </div>
      </div>

      <style>{`
        @media (hover: hover) {
          form *, input, textarea, select, [data-form-cursor] * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
