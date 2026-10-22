import { useEffect, useRef, useState } from 'react';
import { useReveal } from '../hooks/useReveal.js';

const STATS = [
  { value: 4,  suffix: '+', label: 'Years in Production',   desc: 'Full-stack systems & apps', offset: 20, rotate: -2.2 },
  { value: 40, suffix: '+', label: 'Projects Delivered', desc: 'Shipped to production',  offset: 3,  rotate: -0.7 },
  { value: 15, suffix: '+', label: 'Client Engagements',      desc: 'Startups & global teams',           offset: 3,  rotate: 0.7  },
  { value: 5,  suffix: '',  label: 'Countries Served',   desc: 'US · UK · CA · EU · UAE',      offset: 20, rotate: 2.2  },
];

function CountUp({ target, inView, suffix }) {
  const [val, setVal] = useState(0);
  const ran = useRef(false);

  useEffect(() => {
    if (!inView || ran.current) return;
    ran.current = true;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / 1400, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return <>{val}{suffix}</>;
}

export default function StatsBar() {
  const [ref, inView] = useReveal();

  return (
    <div className="wrap" ref={ref} style={{ paddingTop: 60, paddingBottom: 60 }}>
      {/* Arched Stats Container */}
      <div className="arched-stats-wrapper" style={{ position: 'relative' }}>
        {/* SVG Arched Card Outline & Fill (Desktop & Tablet) */}
        <svg
          className="arched-card-svg"
          viewBox="0 0 1200 190"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            overflow: 'visible',
            pointerEvents: 'none',
          }}
        >
          <defs>
            <linearGradient id="arcCardGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(77,38,34,0.07)" />
              <stop offset="100%" stopColor="rgba(77,38,34,0.04)" />
            </linearGradient>
          </defs>

          {/* Arched Ribbon Path — curves up in center matching outer dome */}
          <path
            d="M 12,48
               Q 300,14 600,14
               Q 900,14 1188,48
               Q 1200,50 1200,64
               L 1200,166
               Q 1200,180 1188,178
               Q 900,144 600,144
               Q 300,144 12,178
               Q 0,180 0,166
               L 0,64
               Q 0,50 12,48 Z"
            fill="url(#arcCardGradient)"
            stroke="rgba(77,38,34,0.18)"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />

          {/* Radial arch dividers (angled like arch masonry keystones) */}
          <line
            x1="300" y1="28" x2="300" y2="158"
            stroke="rgba(77,38,34,0.16)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            transform="rotate(-1.8 300 93)"
          />
          <line
            x1="600" y1="14" x2="600" y2="144"
            stroke="rgba(77,38,34,0.16)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <line
            x1="900" y1="28" x2="900" y2="158"
            stroke="rgba(77,38,34,0.16)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            transform="rotate(1.8 900 93)"
          />
        </svg>

        {/* 4 Stat Columns positioned along the curved arc */}
        <div className="stats-arched-grid">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`stat-arc-item stat-col-${i}`}
              style={{
                '--arc-offset': `${s.offset}px`,
                '--arc-rotate': `${s.rotate}deg`,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--display)',
                  fontSize: 'clamp(28px, 3.2vw, 44px)',
                  fontWeight: 700,
                  color: '#4D2622',
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                <CountUp target={s.value} inView={inView} suffix={s.suffix} />
              </div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 14,
                  color: '#4D2622',
                  marginBottom: 4,
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 11.5,
                  color: 'rgba(77,38,34,0.5)',
                }}
              >
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .stats-arched-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          position: relative;
          z-index: 2;
          padding: 10px 0 24px;
        }

        .stat-arc-item {
          padding: 32px 20px;
          text-align: center;
          transform: translateY(var(--arc-offset, 0px)) rotate(var(--arc-rotate, 0deg));
          transform-origin: center center;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .stat-arc-item:hover {
          transform: translateY(calc(var(--arc-offset, 0px) - 4px)) rotate(var(--arc-rotate, 0deg)) scale(1.02);
        }

        @media (max-width: 860px) {
          .arched-card-svg {
            display: none !important;
          }
          .stats-arched-grid {
            border: 1px solid rgba(77,38,34,0.18);
            border-radius: 14px;
            background: rgba(77,38,34,0.06);
            overflow: hidden;
            padding: 0;
          }
          .stat-arc-item {
            transform: none !important;
            border-left: 1px solid rgba(77,38,34,0.18);
          }
          .stat-arc-item:first-child {
            border-left: none;
          }
        }

        @media (max-width: 640px) {
          .stats-arched-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .stats-arched-grid > div:nth-child(3) {
            border-left: none !important;
          }
          .stats-arched-grid > div:nth-child(1),
          .stats-arched-grid > div:nth-child(2) {
            border-bottom: 1px solid rgba(77,38,34,0.18);
          }
        }
      `}</style>
    </div>
  );
}
