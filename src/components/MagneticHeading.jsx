import { useEffect, useRef, useState } from 'react';

// Each word reveals on scroll with a clip-path wipe upward
// Each letter reacts magnetically to cursor proximity
function MagneticWord({ word, isAccent, delay, inView }) {
  const wordRef = useRef(null);
  const lettersRef = useRef([]);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    const onMove = (e) => {
      lettersRef.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width  / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        const threshold = 90;
        if (dist < threshold) {
          const force = (threshold - dist) / threshold;
          const ease  = force * force; // quadratic falloff
          const tx = dx * ease * 0.28;
          const ty = dy * ease * 0.18;
          el.style.transform  = `translate(${tx}px, ${ty}px)`;
          el.style.color      = isAccent ? 'var(--accent-gold)' : `rgba(241,243,249,${0.6 + ease * 0.4})`;
          el.style.transition = 'transform 0.1s ease, color 0.15s ease';
        } else {
          el.style.transform  = 'translate(0,0)';
          el.style.color      = isAccent ? 'var(--accent-gold)' : 'var(--text)';
          el.style.transition = 'transform 0.6s cubic-bezier(.22,1,.36,1), color 0.4s ease';
        }
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [isAccent]);

  const letters = word.split('');

  return (
    <span
      ref={wordRef}
      style={{
        display: 'inline-block',
        overflow: 'hidden',
        verticalAlign: 'bottom',
        marginRight: '0.22em',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          transform: inView ? 'translateY(0)' : 'translateY(110%)',
          transition: `transform 0.75s cubic-bezier(.22,1,.36,1) ${delay}s`,
          willChange: 'transform',
        }}
      >
        {letters.map((ch, i) => (
          <span
            key={i}
            ref={el => { lettersRef.current[i] = el; }}
            style={{
              display: 'inline-block',
              color: isAccent ? 'var(--accent-gold)' : 'var(--text)',
              willChange: 'transform',
              cursor: 'default',
            }}
          >
            {ch}
          </span>
        ))}
      </span>
    </span>
  );
}

// Words config: text, whether it's accent-colored, reveal delay
const LINES = [
  [
    { word: 'I',        accent: false, delay: 0.0  },
    { word: 'Build',    accent: false, delay: 0.08 },
    { word: 'Products', accent: false, delay: 0.16 },
  ],
  [
    { word: 'That',     accent: false, delay: 0.24 },
    { word: 'Scale.',   accent: true,  delay: 0.32 },
  ],
];

export default function MagneticHeading({ inView, style }) {
  return (
    <h1
      style={{
        fontFamily: 'var(--display)',
        fontWeight: 700,
        fontSize: 'clamp(38px, 5vw, 64px)',
        lineHeight: 1.08,
        letterSpacing: '-0.025em',
        marginBottom: 20,
        userSelect: 'none',
        ...style,
      }}
    >
      {LINES.map((line, li) => (
        <div key={li} style={{ display: 'block' }}>
          {line.map(({ word, accent, delay }) => (
            <MagneticWord
              key={word}
              word={word}
              isAccent={accent}
              delay={delay}
              inView={inView}
            />
          ))}
        </div>
      ))}
    </h1>
  );
}
