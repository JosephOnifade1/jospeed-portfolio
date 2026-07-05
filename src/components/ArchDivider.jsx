// Arch divider between sections
// direction: 'down' = arch curves down (dark → light)
//            'up'   = arch curves up   (light → dark)
// fromColor / toColor: CSS color values

export default function ArchDivider({
  fromColor = 'var(--bg)',
  toColor   = 'var(--surface)',
  direction = 'down',
  height    = 80,
}) {
  const id = `arch-${direction}-${Math.random().toString(36).slice(2,6)}`;

  if (direction === 'down') {
    // Bottom of prev section curves down, next section starts below
    return (
      <div style={{ background: fromColor, marginBottom: -1, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height }}>
          <path
            d="M0,0 L1440,0 L1440,20 Q720,80 0,20 Z"
            fill={toColor}
          />
        </svg>
      </div>
    );
  }

  // direction === 'up'
  return (
    <div style={{ background: toColor, marginTop: -1, lineHeight: 0 }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height }}>
        <path
          d="M0,80 L1440,80 L1440,60 Q720,0 0,60 Z"
          fill={fromColor}
        />
      </svg>
    </div>
  );
}
