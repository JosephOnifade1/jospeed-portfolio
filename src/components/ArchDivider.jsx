// Matches the reference site exactly:
// The CREAM section pushes a large dome UP into the DARK section
// "fromColor" is the section above, "toColor" is the section below
// type "dome-up"   — cream dome rises from cream into dark above it
// type "dome-down" — dark dome falls from dark into cream below it

export default function ArchDivider({ type = 'dome-up', height = 120 }) {
  // dome-up: we're transitioning from DARK (above) to CREAM (below)
  // The cream section starts with a big dome that eats into the dark
  if (type === 'dome-up') {
    return (
      <div style={{ background: '#4D2622', lineHeight: 0, display: 'block', marginBottom: -1 }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height }}
          xmlns="http://www.w3.org/2000/svg">
          <path d="M0,80 L0,55 Q360,10 720,10 Q1080,10 1440,55 L1440,80 Z" fill="#F2ECD1" />
        </svg>
      </div>
    );
  }
  return (
    <div style={{ background: '#F2ECD1', lineHeight: 0, display: 'block', marginBottom: -1 }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height }}
        xmlns="http://www.w3.org/2000/svg">
        <path d="M0,80 L0,55 Q360,10 720,10 Q1080,10 1440,55 L1440,80 Z" fill="#4D2622" />
      </svg>
    </div>
  );
}
