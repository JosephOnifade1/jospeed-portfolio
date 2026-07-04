import { useEffect, useRef, useState, useCallback } from 'react';
import { PROJECTS } from '../data/projects.js';

// Pure CSS/DOM carousel — no CSS3DRenderer issues
// Cards are positioned in a real 3D CSS perspective space

export default function ProjectCarousel3D() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const n = PROJECTS.length;

  const goTo = useCallback((idx) => {
    setActiveIdx(((idx % n) + n) % n);
  }, [n]);

  const prev = () => goTo(activeIdx - 1);
  const next = () => goTo(activeIdx + 1);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // Touch/drag
  const onPointerDown = (e) => { startX.current = e.clientX ?? e.touches?.[0]?.clientX; setDragging(true); };
  const onPointerUp   = (e) => {
    if (!dragging) return;
    const endX = e.clientX ?? e.changedTouches?.[0]?.clientX;
    const diff = startX.current - endX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    setDragging(false);
  };

  const getCardStyle = (i) => {
    const total = n;
    // Offset from active
    let offset = i - activeIdx;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    const absOff = Math.abs(offset);
    const isActive = offset === 0;

    const translateX = offset * 240;
    const translateZ = isActive ? 0 : -120 - absOff * 60;
    const rotateY = offset * -22;
    const scale = isActive ? 1 : Math.max(0.7, 1 - absOff * 0.12);
    const opacity = absOff > 2 ? 0 : isActive ? 1 : Math.max(0.25, 1 - absOff * 0.3);
    const zIndex = isActive ? 10 : 10 - absOff;
    const blur = isActive ? 0 : absOff * 1.5;

    return {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: 300,
      marginLeft: -150,
      marginTop: -210,
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex,
      filter: blur > 0 ? `blur(${blur}px)` : 'none',
      transition: dragging ? 'none' : 'all 0.55s cubic-bezier(0.16,1,0.3,1)',
      cursor: isActive ? 'default' : 'pointer',
      pointerEvents: opacity < 0.1 ? 'none' : 'auto',
    };
  };

  return (
    <div
      style={{ position: 'relative', width: '100%', height: 520, perspective: 1200, perspectiveOrigin: '50% 40%', overflow: 'hidden' }}
      onMouseDown={onPointerDown} onMouseUp={onPointerUp}
      onTouchStart={onPointerDown} onTouchEnd={onPointerUp}
    >
      {/* Cards */}
      <div style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d' }}>
        {PROJECTS.map((p, i) => {
          const offset = (() => {
            let o = i - activeIdx;
            if (o > n/2) o -= n;
            if (o < -n/2) o += n;
            return o;
          })();
          const isActive = offset === 0;

          return (
            <div key={p.name} style={getCardStyle(i)} onClick={() => !isActive && goTo(i)}>
              <div style={{
                width: 300, height: 420,
                background: 'var(--surface)',
                border: `1px solid ${isActive ? 'rgba(99,102,241,0.5)' : 'var(--border)'}`,
                borderRadius: 16,
                overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
                boxShadow: isActive ? '0 32px 80px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(99,102,241,0.2)' : 'none',
              }}>
                {/* Gradient band */}
                <div style={{
                  height: 150, flexShrink: 0, position: 'relative',
                  background: p.gradient || 'linear-gradient(160deg,#1a1b2e,#11121c)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'flex-start', justifyContent: 'flex-end',
                  padding: '14px 18px',
                }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.28)' }} />
                  <span style={{
                    position: 'relative', zIndex: 1,
                    fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.06em',
                    color: 'rgba(255,255,255,0.8)', background: 'rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.15)', padding: '3px 9px',
                    borderRadius: 999, marginBottom: 8,
                  }}>{p.tag}</span>
                  <span style={{
                    position: 'relative', zIndex: 1,
                    fontFamily: 'var(--display)', fontSize: 22, fontWeight: 700,
                    color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1,
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                  }}>{p.name}</span>
                </div>

                {/* Body */}
                <div style={{ padding: '16px 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <p style={{ fontFamily: 'var(--body)', fontSize: 12.5, color: 'var(--text-dim)', lineHeight: 1.6, margin: 0, flex: 1,
                    display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {p.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {p.stack.map(s => (
                      <span key={s} style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--cyan)', background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.18)', padding: '2px 7px', borderRadius: 4 }}>{s}</span>
                    ))}
                  </div>
                  {isActive && (
                    <div style={{ display: 'flex', gap: 7, paddingTop: 10, borderTop: '1px solid var(--border)' }}>
                      <button onClick={() => window.location.href = `/case-study/${p.id}`} style={{
                        flex: 1, padding: '8px 0', borderRadius: 7,
                        background: 'var(--indigo)', color: '#fff',
                        border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                        fontFamily: 'var(--body)',
                        transition: 'background 0.2s',
                      }}
                        onMouseEnter={e => e.currentTarget.style.background = '#4f52d9'}
                        onMouseLeave={e => e.currentTarget.style.background = 'var(--indigo)'}
                      >Case study →</button>
                      <a href={p.live || p.github || '#'} target="_blank" rel="noreferrer" style={{
                        padding: '8px 12px', borderRadius: 7,
                        background: 'transparent', color: 'var(--text-dim)',
                        border: '1px solid var(--border-strong)',
                        fontSize: 12, fontWeight: 500, cursor: 'pointer',
                        fontFamily: 'var(--body)', textDecoration: 'none',
                        display: 'flex', alignItems: 'center',
                      }}>
                        {p.live ? 'Live ↗' : 'Code ↗'}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Left arrow */}
      <button onClick={prev} style={{
        position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
        width: 42, height: 42, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)',
        color: 'var(--text)', fontSize: 16, cursor: 'pointer', zIndex: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.2s',
      }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.3)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
      >←</button>

      {/* Right arrow */}
      <button onClick={next} style={{
        position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
        width: 42, height: 42, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)',
        color: 'var(--text)', fontSize: 16, cursor: 'pointer', zIndex: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.2s',
      }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.3)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
      >→</button>

      {/* Counter */}
      <div style={{ position: 'absolute', top: 16, right: 20, fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text-faint)', zIndex: 20 }}>
        {String(activeIdx + 1).padStart(2,'0')} / {String(n).padStart(2,'0')}
      </div>

      {/* Dot indicators */}
      <div style={{ position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 7, zIndex: 20 }}>
        {PROJECTS.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{
            width: i === activeIdx ? 22 : 7, height: 7, borderRadius: 4,
            border: 'none', padding: 0, cursor: 'pointer',
            background: i === activeIdx ? 'var(--indigo-bright)' : 'rgba(255,255,255,0.18)',
            transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
          }} />
        ))}
      </div>

      {/* Drag hint */}
      <div style={{ position: 'absolute', bottom: 18, right: 20, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-faint)', zIndex: 20 }}>
        drag or swipe
      </div>
    </div>
  );
}
