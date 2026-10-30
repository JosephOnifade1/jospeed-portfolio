import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Maximize2, Sparkles, ExternalLink } from 'lucide-react';
import { GithubIcon } from './BrandIcons.jsx';
import { PROJECTS } from '../data/projects.js';
import Smooth3DSlideshow from './originkit/ui/coverflowgallery.tsx';
import { playTactileClick } from '../utils/audioHaptics.js';

const DARK  = '#4D2622';
const CREAM = '#F2ECD1';
const GOLD  = '#c9922a';

export default function CoverflowGallery({ xrayMode = false, onOpenDeepDive }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const total = PROJECTS.length;

  // Format projects into Originkit Smooth3DSlideshow slide contract
  const slides = useMemo(() => {
    return PROJECTS.map((p) => ({
      image: {
        src: p.image || `/projects/${p.id}.svg`,
        alt: p.name,
      },
      title: `${p.name}\n${p.tag}\n${p.stack.slice(0, 3).join(' • ')}`,
    }));
  }, []);

  const activeProject = PROJECTS[activeIndex] || PROJECTS[0];

  const triggerKey = useCallback((key) => {
    playTactileClick('light');
    if (!containerRef.current) return;
    const carouselEl = containerRef.current.querySelector('[role="group"]') || containerRef.current;
    carouselEl.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
  }, []);

  const prev = () => {
    triggerKey('ArrowLeft');
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const next = () => {
    triggerKey('ArrowRight');
    setActiveIndex((prev) => (prev + 1) % total);
  };

  // Sync external arrow key navigation
  useEffect(() => {
    const handleGlobalKey = (e) => {
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + total) % total);
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % total);
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [total]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        borderRadius: 20,
        background: '#180907',
        border: '1px solid rgba(242, 236, 209, 0.14)',
        boxShadow: '0 24px 60px -15px rgba(0,0,0,0.7), inset 0 1px 0 rgba(242,236,209,0.08)',
        padding: '28px 16px 24px',
        overflow: 'hidden',
      }}
    >
      {/* Archival Folio Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px 12px',
          borderBottom: '1px solid rgba(242, 236, 209, 0.08)',
          marginBottom: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: '#c9922a',
              background: 'rgba(201, 146, 42, 0.12)',
              border: '1px solid rgba(201, 146, 42, 0.25)',
              padding: '2px 7px',
              borderRadius: 4,
            }}
          >
            INDEX // 01–06
          </span>
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: CREAM,
              opacity: 0.85,
            }}
          >
            INTERACTIVE PRODUCTION WORKFOLIO
          </span>
        </div>

        <a
          href="/gallery"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: 'var(--mono)',
            fontSize: 11,
            color: GOLD,
            textDecoration: 'none',
            padding: '4px 10px',
            borderRadius: 6,
            background: 'rgba(201, 146, 42, 0.1)',
            border: '1px solid rgba(201, 146, 42, 0.25)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(201, 146, 42, 0.2)';
            e.currentTarget.style.borderColor = GOLD;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(201, 146, 42, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(201, 146, 42, 0.25)';
          }}
        >
          <Maximize2 size={11} />
          Full-screen View
        </a>
      </div>

      {/* Originkit Coverflow Component Stage */}
      <div
        style={{
          position: 'relative',
          height: 480,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Smooth3DSlideshow
          slides={slides}
          cardWidth={420}
          cardHeight={400}
          radius={5}
          gap={8}
          tilt={14}
          sideTilt={8}
          opacity={55}
          showTitle={true}
          titleColor="#ffffff"
          titleFont={{
            fontFamily: "var(--display, 'Playfair Display', serif)",
            fontSize: '22px',
            fontWeight: 800,
            lineHeight: '1.15em',
            letterSpacing: '-0.02em',
          }}
          titlePosition={{
            position: 'bottomLeft',
            paddingLeft: 22,
            paddingRight: 22,
            paddingTop: 20,
            paddingBottom: 22,
          }}
          style={{
            width: '100%',
            height: '100%',
            background: 'transparent',
          }}
        />
      </div>

      {/* Controls & Active Project Info Deck */}
      <div
        style={{
          marginTop: 20,
          padding: '16px 20px',
          borderRadius: 16,
          background: 'rgba(30, 12, 10, 0.65)',
          border: '1px solid rgba(242, 236, 209, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        {/* Navigation & Counter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button
            onClick={prev}
            aria-label="Previous Project"
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              border: '1px solid rgba(242, 236, 209, 0.2)',
              background: 'rgba(242, 236, 209, 0.08)',
              color: CREAM,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(201, 146, 42, 0.25)';
              e.currentTarget.style.borderColor = GOLD;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(242, 236, 209, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(242, 236, 209, 0.2)';
            }}
          >
            <ChevronLeft size={18} />
          </button>

          {/* Indicators */}
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {PROJECTS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => {
                  playTactileClick('light');
                  setActiveIndex(i);
                  // Dispatch appropriate arrows to carousel
                  const diff = i - activeIndex;
                  const key = diff > 0 ? 'ArrowRight' : 'ArrowLeft';
                  for (let step = 0; step < Math.abs(diff); step++) {
                    triggerKey(key);
                  }
                }}
                style={{
                  width: i === activeIndex ? 22 : 7,
                  height: 7,
                  borderRadius: 4,
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  background: i === activeIndex ? GOLD : 'rgba(242, 236, 209, 0.25)',
                  boxShadow: i === activeIndex ? `0 0 8px ${GOLD}` : 'none',
                  transition: 'all 0.3s cubic-bezier(.22,1,.36,1)',
                }}
                aria-label={`Jump to project ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next Project"
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              border: '1px solid rgba(242, 236, 209, 0.2)',
              background: 'rgba(242, 236, 209, 0.08)',
              color: CREAM,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(201, 146, 42, 0.25)';
              e.currentTarget.style.borderColor = GOLD;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(242, 236, 209, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(242, 236, 209, 0.2)';
            }}
          >
            <ChevronRight size={18} />
          </button>

          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(242,236,209,0.5)', marginLeft: 4 }}>
            {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>

        {/* Action Buttons for active project */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={() => {
              playTactileClick('pop');
              if (onOpenDeepDive) onOpenDeepDive(activeProject);
            }}
            style={{
              padding: '9px 18px',
              borderRadius: 8,
              background: CREAM,
              color: DARK,
              border: 'none',
              fontFamily: 'var(--body)',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = CREAM;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>Deep Dive: {activeProject.name}</span>
            <ArrowUpRight size={14} />
          </button>

          {activeProject.github && activeProject.github !== '#' && (
            <a
              href={activeProject.github}
              target="_blank"
              rel="noreferrer"
              title="GitHub Code"
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: 'rgba(242, 236, 209, 0.08)',
                border: '1px solid rgba(242, 236, 209, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: CREAM,
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(201, 146, 42, 0.25)';
                e.currentTarget.style.borderColor = GOLD;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(242, 236, 209, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(242, 236, 209, 0.2)';
              }}
            >
              <GithubIcon size={14} color="currentColor" />
            </a>
          )}

          {activeProject.live && (
            <a
              href={activeProject.live}
              target="_blank"
              rel="noreferrer"
              title="Live Demo"
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: 'rgba(242, 236, 209, 0.08)',
                border: '1px solid rgba(242, 236, 209, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: CREAM,
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(201, 146, 42, 0.25)';
                e.currentTarget.style.borderColor = GOLD;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(242, 236, 209, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(242, 236, 209, 0.2)';
              }}
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
