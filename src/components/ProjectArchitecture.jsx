import { ArrowUpRight, RotateCcw } from 'lucide-react';

const DARK = '#4D2622';
const CREAM = '#F2ECD1';
const GOLD = '#c9922a';

export default function ProjectArchitecture({ project, onFlipBack, isActive = true }) {
  const { architecture, name, id } = project;
  if (!architecture) return null;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: 18,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(160deg, #3d1b18 0%, #29110f 45%, #1a0a09 100%)',
        border: '1px solid rgba(242, 236, 209, 0.2)',
        boxShadow: isActive
          ? '0 32px 70px -15px rgba(26, 10, 9, 0.95), 0 0 0 1px rgba(201, 146, 42, 0.25)'
          : '0 12px 30px rgba(0,0,0,0.6)',
        position: 'relative',
        color: CREAM,
        padding: '22px 24px',
        boxSizing: 'border-box',
      }}
    >
      {/* Editorial Watermark & Blueprint Accent Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(242, 236, 209, 0.05) 1px, transparent 0)',
          backgroundSize: '20px 20px',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 140,
          height: 140,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201, 146, 42, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top Bar: Telemetry Badge & Flip Action */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 14,
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: GOLD,
              boxShadow: '0 0 10px rgba(201, 146, 42, 0.9)',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 10,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: GOLD,
              fontWeight: 600,
            }}
          >
            SYSTEM ARCHITECTURE
          </span>
        </div>

        {onFlipBack && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFlipBack();
            }}
            title="Switch back to Product View"
            style={{
              background: 'rgba(242, 236, 209, 0.08)',
              border: '1px solid rgba(242, 236, 209, 0.18)',
              borderRadius: 6,
              color: CREAM,
              padding: '4px 9px',
              fontSize: 11,
              fontFamily: 'var(--mono)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(242, 236, 209, 0.16)';
              e.currentTarget.style.borderColor = 'rgba(242, 236, 209, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(242, 236, 209, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(242, 236, 209, 0.18)';
            }}
          >
            <RotateCcw size={11} color={CREAM} /> Product View
          </button>
        )}
      </div>

      {/* Project Identity & Subtitle */}
      <div style={{ position: 'relative', zIndex: 2, marginBottom: 14 }}>
        <h3
          style={{
            fontFamily: 'var(--display)',
            fontSize: 23,
            fontWeight: 800,
            color: CREAM,
            margin: '0 0 3px 0',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
          }}
        >
          {name}
        </h3>
        <p
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 11,
            color: 'rgba(242, 236, 209, 0.5)',
            margin: 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {architecture.headline}
        </p>
      </div>

      {/* Connected Circuit Pipeline (Warm Editorial Schematic) */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingLeft: 18,
          marginBottom: 12,
        }}
      >
        {/* Continuous Schematic Track Line */}
        <div
          style={{
            position: 'absolute',
            left: 6,
            top: 10,
            bottom: 12,
            width: 1.5,
            background: 'linear-gradient(to bottom, rgba(201, 146, 42, 0.6) 0%, rgba(242, 236, 209, 0.2) 100%)',
          }}
        />

        {architecture.nodes.map((node, idx) => (
          <div
            key={node.role}
            style={{
              position: 'relative',
              padding: '6px 0',
            }}
          >
            {/* Precision Pin / Rivet on the Track */}
            <div
              style={{
                position: 'absolute',
                left: -18,
                top: 10,
                width: 13,
                height: 13,
                borderRadius: '50%',
                background: '#29110f',
                border: `1.5px solid ${idx === 0 ? GOLD : 'rgba(242, 236, 209, 0.4)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: idx === 0 ? '0 0 8px rgba(201, 146, 42, 0.5)' : 'none',
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: idx === 0 ? GOLD : CREAM,
                  opacity: idx === 0 ? 1 : 0.6,
                }}
              />
            </div>

            {/* Node Metadata & Description */}
            <div style={{ marginLeft: 2 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: 8,
                  marginBottom: 1,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 9.5,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'rgba(242, 236, 209, 0.45)',
                    fontWeight: 600,
                  }}
                >
                  {node.role}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    fontWeight: 700,
                    color: CREAM,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {node.tech}
                </span>
              </div>
              <p
                style={{
                  fontSize: 11.5,
                  color: 'rgba(242, 236, 209, 0.68)',
                  margin: 0,
                  lineHeight: 1.4,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {node.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Editorial Benchmark & Strategic Trade-off Box */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          background: 'rgba(242, 236, 209, 0.04)',
          border: '1px solid rgba(242, 236, 209, 0.12)',
          borderRadius: 10,
          padding: '10px 12px',
          marginBottom: 12,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 6,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 9.5,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(242, 236, 209, 0.45)',
            }}
          >
            Core Benchmark
          </span>
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 11,
              fontWeight: 700,
              color: GOLD,
            }}
          >
            {architecture.metric}
          </span>
        </div>

        <p
          style={{
            fontSize: 11,
            color: 'rgba(242, 236, 209, 0.65)',
            margin: 0,
            lineHeight: 1.45,
            fontStyle: 'italic',
            borderLeft: `2px solid ${GOLD}`,
            paddingLeft: 8,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          "{architecture.tradeoff}"
        </p>
      </div>

      {/* CTA Button */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (isActive) window.location.href = `/case-study/${id}`;
          }}
          style={{
            width: '100%',
            padding: '10px 0',
            borderRadius: 8,
            background: isActive ? CREAM : 'rgba(242, 236, 209, 0.08)',
            color: isActive ? DARK : 'rgba(242, 236, 209, 0.4)',
            border: 'none',
            fontFamily: 'var(--body)',
            fontSize: 12.5,
            fontWeight: 700,
            cursor: isActive ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            transition: 'all 0.25s',
          }}
          onMouseEnter={(e) => {
            if (isActive) {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            if (isActive) {
              e.currentTarget.style.background = CREAM;
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}
        >
          Engineering Deep Dive <ArrowUpRight size={13} />
        </button>
      </div>
    </div>
  );
}
