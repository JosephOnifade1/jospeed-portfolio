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
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height }}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cream dome rising UP into the dark section */}
          <path
            d="M0,120 L0,80 Q360,0 720,0 Q1080,0 1440,80 L1440,120 Z"
            fill="#F2ECD1"
          />
        </svg>
      </div>
    );
  }

  // dome-down: we're transitioning from CREAM (above) to DARK (below)
  // The dark section starts with a dome that eats into the cream
  return (
    <div style={{ background: '#F2ECD1', lineHeight: 0, display: 'block', marginBottom: -1 }}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Dark dome rising UP into the cream section */}
        <path
          d="M0,120 L0,80 Q360,0 720,0 Q1080,0 1440,80 L1440,120 Z"
          fill="#4D2622"
        />
      </svg>
    </div>
  );
}
