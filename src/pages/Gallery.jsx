import { useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { PROJECTS } from '../data/projects.js';
import Smooth3DSlideshow from '../components/originkit/ui/coverflowgallery.tsx';

export default function Gallery() {
  const slides = useMemo(() => {
    return PROJECTS.map((p) => ({
      image: {
        src: p.image || `/projects/${p.id}.svg`,
        alt: p.name,
      },
      title: `${p.name}\n${p.tag}\n${p.stack.slice(0, 3).join(' • ')}`,
    }));
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#000000',
        color: '#F2ECD1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '24px 16px',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Subtle top navigation bar */}
      <header
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '24px 36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 50,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 100%)',
        }}
      >
        <a
          href="/#projects"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            color: '#F2ECD1',
            textDecoration: 'none',
            fontFamily: 'var(--mono, monospace)',
            fontSize: 13,
            fontWeight: 600,
            padding: '8px 16px',
            borderRadius: 8,
            background: 'rgba(242, 236, 209, 0.08)',
            border: '1px solid rgba(242, 236, 209, 0.15)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(242, 236, 209, 0.18)';
            e.currentTarget.style.borderColor = '#c9922a';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(242, 236, 209, 0.08)';
            e.currentTarget.style.borderColor = 'rgba(242, 236, 209, 0.15)';
          }}
        >
          <ArrowLeft size={14} />
          Back to Portfolio
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            style={{
              fontFamily: 'var(--mono, monospace)',
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
            FOLIO
          </span>
          <span
            style={{
              fontFamily: 'var(--mono, monospace)',
              fontSize: 11.5,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(242,236,209,0.85)',
            }}
          >
            JOSEPH ONIFADE // SELECTED WORK
          </span>
        </div>
      </header>

      {/* Full-Screen Centered Originkit 3D Coverflow Gallery */}
      <main
        style={{
          width: '100%',
          maxWidth: 1200,
          height: '80vh',
          maxHeight: 640,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Smooth3DSlideshow
          slides={slides}
          cardWidth={460}
          cardHeight={440}
          radius={5}
          gap={9}
          tilt={14}
          sideTilt={8}
          opacity={60}
          showTitle={true}
          titleColor="#ffffff"
          titleFont={{
            fontFamily: "var(--display, 'Playfair Display', serif)",
            fontSize: '26px',
            fontWeight: 800,
            lineHeight: '1.15em',
            letterSpacing: '-0.02em',
          }}
          titlePosition={{
            position: 'bottomLeft',
            paddingLeft: 26,
            paddingRight: 26,
            paddingTop: 24,
            paddingBottom: 26,
          }}
          style={{
            width: '100%',
            height: '100%',
            background: 'transparent',
          }}
        />
      </main>

      {/* Subtle bottom keyboard hint */}
      <footer
        style={{
          position: 'absolute',
          bottom: 24,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: 'var(--mono, monospace)',
          fontSize: 12,
          color: 'rgba(242, 236, 209, 0.4)',
          letterSpacing: '0.05em',
          pointerEvents: 'none',
        }}
      >
        Use <kbd style={{ padding: '2px 6px', background: 'rgba(255,255,255,0.1)', borderRadius: 4 }}>←</kbd> and <kbd style={{ padding: '2px 6px', background: 'rgba(255,255,255,0.1)', borderRadius: 4 }}>→</kbd> keys or click cards to rotate the coverflow
      </footer>
    </div>
  );
}
