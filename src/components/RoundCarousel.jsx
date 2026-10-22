import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from './BrandIcons.jsx';
import { PROJECTS } from '../data/projects.js';
import { playTactileClick } from '../utils/audioHaptics.js';

const DARK  = '#4D2622';
const CREAM = '#F2ECD1';
const GOLD  = '#c9922a';
const WINE  = '#8b1a1a';

/* ─── Orbit thumbnail ─────────────────────────────────────────────── */
function OrbitThumb({ project, angle, isActive, onClick, total }) {
  // Orbit radius as a CSS variable-friendly value
  const [hovered, setHovered] = useState(false);

  // Convert polar angle → x/y offsets from center (radius = 42% of wrapper)
  const rad = (angle * Math.PI) / 180;
  const rx = 44; // % horizontal radius
  const ry = 41; // % vertical radius (ellipse for perspective feel)
  const x = rx * Math.cos(rad);
  const y = ry * Math.sin(rad);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'absolute',
        left: `calc(50% + ${x}%)`,
        top:  `calc(50% + ${y}%)`,
        transform: `translate(-50%,-50%) scale(${isActive ? 1.15 : hovered ? 1.05 : 1})`,
        width: isActive ? 68 : 52,
        height: isActive ? 68 : 52,
        borderRadius: '50%',
        overflow: 'hidden',
        border: `2px solid ${isActive ? GOLD : hovered ? 'rgba(201,146,42,0.5)' : 'rgba(77,38,34,0.3)'}`,
        boxShadow: isActive
          ? `0 0 0 3px rgba(201,146,42,0.25), 0 8px 24px rgba(0,0,0,0.35)`
          : hovered
          ? `0 4px 16px rgba(0,0,0,0.25)`
          : `0 2px 8px rgba(0,0,0,0.2)`,
        cursor: 'pointer',
        background: project.gradient,
        transition: 'all 0.45s cubic-bezier(0.22,1,0.36,1)',
        zIndex: isActive ? 10 : hovered ? 9 : 5,
        padding: 0,
        flexShrink: 0,
      }}
      aria-label={project.name}
    >
      {/* Thumbnail image or gradient */}
      <img
        src={project.image || `/projects/${project.id}.png`}
        alt={project.name}
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
        onError={e => { e.currentTarget.style.display = 'none'; }}
      />
      {/* Active indicator ring pulse */}
      {isActive && (
        <span style={{
          position: 'absolute', inset: -4,
          borderRadius: '50%',
          border: `2px solid ${GOLD}`,
          opacity: 0.5,
          animation: 'rc-pulse 1.8s ease-in-out infinite',
          pointerEvents: 'none',
        }} />
      )}
    </button>
  );
}

/* ─── Featured card (center) ──────────────────────────────────────── */
function FeaturedCard({ project, onOpenDeepDive }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [entering, setEntering] = useState(false);
  const prevId = useRef(project.id);

  useEffect(() => {
    if (prevId.current !== project.id) {
      setEntering(true);
      setImgLoaded(false);
      const t = setTimeout(() => setEntering(false), 420);
      prevId.current = project.id;
      return () => clearTimeout(t);
    }
  }, [project.id]);

  const imgSrc = project.image || `/projects/${project.id}.png`;

  return (
    <div style={{
      width: '100%', height: '100%',
      borderRadius: 20,
      overflow: 'hidden',
      background: DARK,
      border: `1px solid rgba(242,236,209,0.22)`,
      boxShadow: '0 32px 72px -16px rgba(0,0,0,0.65), 0 0 0 1px rgba(242,236,209,0.1)',
      display: 'flex',
      flexDirection: 'column',
      opacity: entering ? 0 : 1,
      transform: entering ? 'scale(0.97) translateY(6px)' : 'scale(1) translateY(0)',
      transition: 'opacity 0.38s ease, transform 0.38s cubic-bezier(0.22,1,0.36,1)',
      position: 'relative',
    }}>
      {/* Banner */}
      <div style={{
        height: 200, flexShrink: 0,
        background: project.gradient,
        position: 'relative', overflow: 'hidden',
      }}>
        <img
          src={imgSrc}
          alt={project.name}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgLoaded(false)}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'top center',
            opacity: imgLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(20,8,7,0.1) 0%, rgba(20,8,7,0.75) 100%)',
        }} />
        {/* Gold shimmer line at top */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
          opacity: 0.6,
        }} />
        {/* Category tag */}
        <div style={{
          position: 'absolute', top: 14, left: 16,
          fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.07em',
          color: 'rgba(255,255,255,0.85)',
          background: 'rgba(0,0,0,0.45)',
          border: '1px solid rgba(255,255,255,0.18)',
          padding: '3px 10px', borderRadius: 999, zIndex: 2,
        }}>{project.tag}</div>
        {/* Title */}
        <div style={{
          position: 'absolute', bottom: 16, left: 18,
          fontFamily: 'var(--display)', fontSize: 26, fontWeight: 800,
          color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1,
          textShadow: '0 2px 16px rgba(0,0,0,0.65)',
          zIndex: 2,
        }}>{project.name}</div>
      </div>

      {/* Body */}
      <div style={{ padding: '18px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <p style={{
          fontSize: 13.5, color: 'rgba(242,236,209,0.62)',
          lineHeight: 1.7, flex: 1,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>{project.description}</p>

        {/* Stack chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.stack.map(s => (
            <span key={s} style={{
              fontFamily: 'var(--mono)', fontSize: 10.5,
              color: CREAM, background: 'rgba(242,236,209,0.08)',
              border: '1px solid rgba(242,236,209,0.18)',
              padding: '3px 9px', borderRadius: 5,
            }}>{s}</span>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 8, paddingTop: 4 }}>
          <button
            onClick={() => onOpenDeepDive(project)}
            style={{
              flex: 1, padding: '10px 0', borderRadius: 8,
              background: CREAM, color: DARK,
              border: 'none', fontFamily: 'var(--body)',
              fontSize: 13, fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
              transition: 'all 0.22s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = CREAM; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Case study <ArrowUpRight size={13} />
          </button>
          {project.github && project.github !== '#' && (
            <a
              href={project.github} target="_blank" rel="noreferrer"
              style={{
                width: 38, height: 38, borderRadius: 8, flexShrink: 0,
                background: 'rgba(242,236,209,0.08)',
                border: '1px solid rgba(242,236,209,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: CREAM, transition: 'all 0.22s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(242,236,209,0.16)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(242,236,209,0.08)'; }}
              title="Source Code"
            >
              <GithubIcon size={14} color="currentColor" />
            </a>
          )}
          {project.live && (
            <a
              href={project.live} target="_blank" rel="noreferrer"
              style={{
                width: 38, height: 38, borderRadius: 8, flexShrink: 0,
                background: 'rgba(242,236,209,0.08)',
                border: '1px solid rgba(242,236,209,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: CREAM, transition: 'all 0.22s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(242,236,209,0.16)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(242,236,209,0.08)'; }}
              title="Live Demo"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Main RoundCarousel ──────────────────────────────────────────── */
export default function RoundCarousel({ onOpenDeepDive }) {
  const [active, setActive] = useState(0);
  const n = PROJECTS.length;
  const startX = useRef(null);
  const wrapperRef = useRef(null);

  const goTo = useCallback(i => {
    playTactileClick('light');
    setActive(((i % n) + n) % n);
  }, [n]);

  const prev = useCallback(() => goTo(active - 1), [active, goTo]);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);

  /* Keyboard nav */
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  /* Touch/drag */
  const onPointerDown = e => { startX.current = e.clientX ?? e.touches?.[0]?.clientX; };
  const onPointerUp   = e => {
    if (startX.current === null) return;
    const endX = e.clientX ?? e.changedTouches?.[0]?.clientX;
    const diff = startX.current - endX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    startX.current = null;
  };

  /* Auto-advance every 6s (pauses on hover) */
  const paused = useRef(false);
  useEffect(() => {
    const id = setInterval(() => { if (!paused.current) next(); }, 6000);
    return () => clearInterval(id);
  }, [next]);

  /* Compute angle for each thumb: distribute evenly in a full circle,
     rotate so active is always at top (270°) */
  const angleFor = i => {
    const base = (360 / n) * i;
    const rotationOffset = -(360 / n) * active - 90; // keep active at top
    return base + rotationOffset;
  };

  return (
    <div style={{ position: 'relative', width: '100%', userSelect: 'none' }}>
      {/* ── Outer orbit + center feature wrapper ── */}
      <div
        ref={wrapperRef}
        style={{ position: 'relative', width: '100%', paddingBottom: '72%', maxWidth: 820, margin: '0 auto' }}
        onMouseEnter={() => { paused.current = true; }}
        onMouseLeave={() => { paused.current = false; }}
        onMouseDown={onPointerDown}
        onMouseUp={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchEnd={onPointerUp}
      >
        <div style={{ position: 'absolute', inset: 0 }}>

          {/* ── Orbit ring (decorative SVG ellipse) ── */}
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <ellipse
              cx="50" cy="50" rx="44" ry="41"
              fill="none"
              stroke={`url(#rc-ring-grad)`}
              strokeWidth="0.35"
              strokeDasharray="2.2 1.8"
            />
            <defs>
              <linearGradient id="rc-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor={GOLD} stopOpacity="0.6" />
                <stop offset="50%"  stopColor={WINE} stopOpacity="0.3" />
                <stop offset="100%" stopColor={GOLD} stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </svg>

          {/* ── Orbit thumbs ── */}
          {PROJECTS.map((p, i) => (
            <OrbitThumb
              key={p.id}
              project={p}
              angle={angleFor(i)}
              isActive={i === active}
              onClick={() => goTo(i)}
              total={n}
            />
          ))}

          {/* ── Center feature card ── */}
          <div style={{
            position: 'absolute',
            left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '46%',
            aspectRatio: '3 / 4',
            zIndex: 20,
            cursor: 'default',
          }}>
            <FeaturedCard
              project={PROJECTS[active]}
              onOpenDeepDive={onOpenDeepDive}
            />
          </div>

          {/* ── Soft radial glow behind center card ── */}
          <div style={{
            position: 'absolute',
            left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '55%', height: '65%',
            background: `radial-gradient(ellipse, rgba(139,26,26,0.18) 0%, transparent 70%)`,
            pointerEvents: 'none',
            zIndex: 1,
          }} />
        </div>
      </div>

      {/* ── Controls row ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 28 }}>
        <button
          onClick={prev}
          style={controlBtn}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(77,38,34,0.18)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(77,38,34,0.08)'}
          aria-label="Previous project"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Dot indicators */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {PROJECTS.map((p, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              title={p.name}
              style={{
                width: i === active ? 26 : 8, height: 8,
                borderRadius: 4, border: 'none', padding: 0, cursor: 'pointer',
                background: i === active ? DARK : 'rgba(77,38,34,0.22)',
                transition: 'all 0.38s cubic-bezier(0.22,1,0.36,1)',
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          style={controlBtn}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(77,38,34,0.18)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(77,38,34,0.08)'}
          aria-label="Next project"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Project counter + name */}
      <div style={{ textAlign: 'center', marginTop: 12, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(77,38,34,0.35)', letterSpacing: '0.06em' }}>
          {String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
        </div>
        <div style={{
          fontFamily: 'var(--display)', fontSize: 15, fontWeight: 700,
          color: 'rgba(77,38,34,0.55)', letterSpacing: '-0.01em',
        }}>
          {PROJECTS[active].name}
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes rc-pulse {
          0%,100% { opacity: 0.5; transform: scale(1); }
          50%      { opacity: 0.15; transform: scale(1.25); }
        }
      `}</style>
    </div>
  );
}

const controlBtn = {
  width: 42, height: 42,
  borderRadius: '50%',
  border: '1px solid rgba(77,38,34,0.22)',
  background: 'rgba(77,38,34,0.08)',
  color: DARK,
  cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  transition: 'background 0.2s',
};
