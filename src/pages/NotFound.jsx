import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

export default function NotFound() {
  return (
    <>
      <div className="grain" />
      <Navbar />
      <main
        style={{
          background: '#070906',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 'clamp(100px, 12vw, 160px) 24px 60px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(216,243,106,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* 404 Large Text */}
        <div
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 900,
            fontSize: 'clamp(100px, 20vw, 200px)',
            color: 'transparent',
            WebkitTextStroke: '2px rgba(216, 243, 106, 0.35)',
            letterSpacing: '-0.05em',
            lineHeight: 1,
            marginBottom: 12,
            position: 'relative',
            zIndex: 1,
            userSelect: 'none',
          }}
        >
          404
        </div>

        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.15em',
            color: 'var(--citron)',
            textTransform: 'uppercase',
            marginBottom: 20,
            position: 'relative',
            zIndex: 1,
          }}
        >
          ⚡ Page Not Found
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 700,
            fontSize: 'clamp(24px, 3.5vw, 40px)',
            color: '#FFFFFF',
            letterSpacing: '-0.03em',
            lineHeight: 1.2,
            margin: '0 0 16px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Looks like you've wandered<br />into uncharted territory.
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 16,
            color: 'rgba(245, 244, 238, 0.55)',
            lineHeight: 1.7,
            maxWidth: 400,
            margin: '0 0 40px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          This page doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <Link to="/" className="btn-citron-pill" style={{ textDecoration: 'none', padding: '13px 32px', fontSize: 15 }}>
            Go Home
          </Link>
          <Link to="/blog" className="btn-ghost-pill" style={{ textDecoration: 'none', padding: '13px 28px', fontSize: 15 }}>
            Read Blog
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

