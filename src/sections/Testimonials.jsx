import { ShieldCheck } from 'lucide-react';
import { useReveal } from '../hooks/useReveal.js';

const DARK = '#4D2622';
const GOLD = '#c9922a';

const TESTIMONIALS = [
  {
    scope: 'FULL-STACK REPLATFORMING',
    quote: 'JOspeed rebuilt our booking flow in days, not weeks. Communication was async and effortless across time zones.',
    impact: 'Reduced checkout abandonment by ~28% within the first month post-launch.',
    name: 'Jurre B.',
    role: 'Product Lead',
    place: 'Netherlands 🇳🇱',
    platform: 'Fiverr Verified Contract',
    rating: '5.0 ★ Verified Delivery',
  },
  {
    scope: 'SUPABASE & EDGE RUNTIME',
    quote: 'Fast, clean Supabase work and he actually explains architecture decisions instead of just shipping code blindly.',
    impact: 'Delivered strict Row-Level Security policies and schema migrations with zero downtime.',
    name: 'Kenneth M.',
    role: 'Founder & CTO',
    place: 'United States 🇺🇸',
    platform: 'Fiverr Verified Contract',
    rating: '5.0 ★ Verified Delivery',
  },
  {
    scope: 'AUTONOMOUS WORKFLOWS',
    quote: 'The automation he built saves our team hours every week. Exactly the kind of builder you want on a lean team.',
    impact: 'Automated 100% of inbound lead triage and CRM pipeline routing.',
    name: 'Raj P.',
    role: 'Operations Director',
    place: 'UAE 🇦🇪',
    platform: 'Direct Engagement',
    rating: '5.0 ★ Retainer Delivery',
  },
];

function TestimonialCard({ t, i }) {
  const [ref, inView] = useReveal(0.15);

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${i * 0.12}s`, height: '100%' }}
    >
      <div
        style={{
          background: '#ffffff',
          border: '1px solid rgba(77, 38, 34, 0.16)',
          borderRadius: 14,
          padding: '28px 26px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 4px 20px rgba(77, 38, 34, 0.06)',
          position: 'relative',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.borderColor = 'rgba(77, 38, 34, 0.35)';
          e.currentTarget.style.boxShadow = '0 18px 36px -8px rgba(77, 38, 34, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.borderColor = 'rgba(77, 38, 34, 0.16)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(77, 38, 34, 0.06)';
        }}
      >
        <div>
          {/* Header Bar: Scope Tag & Verified Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
              marginBottom: 18,
              paddingBottom: 14,
              borderBottom: '1px solid rgba(77, 38, 34, 0.1)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 10,
                letterSpacing: '0.08em',
                color: DARK,
                fontWeight: 700,
                opacity: 0.6,
              }}
            >
              // {t.scope}
            </span>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                background: 'rgba(201, 146, 42, 0.12)',
                border: '1px solid rgba(201, 146, 42, 0.3)',
                padding: '2px 8px',
                borderRadius: 999,
              }}
            >
              <ShieldCheck size={11} color={GOLD} />
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 10,
                  fontWeight: 700,
                  color: DARK,
                  letterSpacing: '0.02em',
                }}
              >
                {t.rating}
              </span>
            </div>
          </div>

          {/* Quote Body */}
          <p
            style={{
              fontFamily: 'var(--body)',
              fontSize: 15,
              color: DARK,
              lineHeight: 1.65,
              marginBottom: 16,
              fontWeight: 500,
            }}
          >
            "{t.quote}"
          </p>

          {/* Impact Metric Callout */}
          <div
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 11.5,
              color: 'rgba(77, 38, 34, 0.75)',
              background: 'rgba(77, 38, 34, 0.04)',
              borderLeft: `2px solid ${GOLD}`,
              padding: '8px 12px',
              borderRadius: '0 6px 6px 0',
              marginBottom: 20,
              lineHeight: 1.5,
            }}
          >
            <span style={{ fontWeight: 700, color: DARK }}>Result: </span>
            {t.impact}
          </div>
        </div>

        {/* Client Footer */}
        <div
          style={{
            paddingTop: 14,
            borderTop: '1px solid rgba(77, 38, 34, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: 14.5, color: DARK }}>
              {t.name}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(77, 38, 34, 0.55)', marginTop: 2 }}>
              {t.role} · {t.place}
            </div>
          </div>
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 10,
              color: 'rgba(77, 38, 34, 0.45)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {t.platform}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [headRef, headIn] = useReveal();

  return (
    <section id="testimonials" style={{ padding: '80px 0' }}>
      <div className="wrap">
        <div ref={headRef} className={`reveal ${headIn ? 'in-view' : ''}`} style={{ marginBottom: 44 }}>
          <div
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 11.5,
              letterSpacing: '0.1em',
              color: DARK,
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 14,
              opacity: 0.55,
            }}
          >
            <span style={{ width: 18, height: 1, background: DARK, display: 'inline-block' }} />
            Delivery Records
          </div>
          <h2
            style={{
              fontFamily: 'var(--display)',
              fontSize: 'clamp(28px, 4vw, 46px)',
              fontWeight: 800,
              color: DARK,
              letterSpacing: '-0.02em',
              margin: '0 0 8px 0',
            }}
          >
            Trusted across time zones.
          </h2>
          <p style={{ margin: 0, fontSize: 14.5, color: 'rgba(77, 38, 34, 0.65)', maxWidth: 540 }}>
            Verifiable engagements with startup founders and product leads across the US, Europe, and the Middle East.
          </p>
        </div>

        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}
          className="testimonial-grid"
        >
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} t={t} i={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .testimonial-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
