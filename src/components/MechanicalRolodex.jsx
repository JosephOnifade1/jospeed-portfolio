import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DEFAULT_ROLES = [
  'Full-Stack Developer',
  'AI Automation Specialist',
  'React & Supabase Architect',
  'n8n Workflow Specialist',
];

export default function MechanicalRolodex({ roles = DEFAULT_ROLES, interval = 3400 }) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, interval);
    return () => clearInterval(timer);
  }, [isPaused, roles.length, interval]);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % roles.length);
  };

  const total = String(roles.length).padStart(2, '0');
  const currentNum = String(index + 1).padStart(2, '0');

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 20,
        minHeight: 28,
        cursor: 'pointer',
        userSelect: 'none',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onClick={handleNext}
      title="Click to advance role"
    >
      {/* Index Counter Badge */}
      <div
        style={{
          fontFamily: 'var(--mono)',
          fontSize: 11,
          fontWeight: 600,
          color: 'var(--gold)',
          background: 'rgba(201,146,42,0.1)',
          border: '1px solid rgba(201,146,42,0.25)',
          padding: '2px 8px',
          borderRadius: 4,
          letterSpacing: '0.06em',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          flexShrink: 0,
        }}
      >
        <span style={{ color: '#F2ECD1' }}>{currentNum}</span>
        <span style={{ opacity: 0.4 }}>/</span>
        <span style={{ opacity: 0.6 }}>{total}</span>
      </div>

      {/* Hairline Divider */}
      <div
        style={{
          width: 1,
          height: 14,
          background: 'rgba(242,236,209,0.18)',
          flexShrink: 0,
        }}
      />

      {/* Roller Window */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          height: 26,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={index}
            initial={{ y: 22, opacity: 0, filter: 'blur(3px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: -22, opacity: 0, filter: 'blur(3px)' }}
            transition={{
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 'clamp(13px, 1.4vw, 15.5px)',
              fontWeight: 500,
              color: 'var(--accent-gold)',
              letterSpacing: '0.01em',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span>{roles[index]}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
