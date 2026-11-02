import { useReveal } from '../hooks/useReveal.js';
import { ShieldCheck } from 'lucide-react';

const TESTIMONIALS = [
  {
    scope: 'FULL-STACK REPLATFORMING',
    quote: 'JOspeed rebuilt our booking flow in days, not weeks. Communication was async and effortless across time zones.',
    name: 'Jurre B.',
    role: 'Product Lead · Netherlands 🇳🇱',
    platform: 'Fiverr Verified Contract',
  },
  {
    scope: 'SUPABASE & EDGE RUNTIME',
    quote: 'Fast, clean Supabase work and he actually explains architecture decisions instead of just shipping code blindly.',
    name: 'Kenneth M.',
    role: 'Founder & CTO · United States 🇺🇸',
    platform: 'Fiverr Verified Contract',
  },
  {
    scope: 'AUTONOMOUS WORKFLOWS',
    quote: 'The automation he built saves our team hours every week. Exactly the kind of builder you want on a lean team.',
    name: 'Adaeze O.',
    role: 'Ops Lead · Nigeria 🇳🇬',
    platform: 'Fiverr Verified Contract',
  },
];

export default function Testimonials() {
  const [headRef, headIn] = useReveal();

  return (
    <section
      id="testimonials"
      style={{
        padding: 'clamp(72px, 9vw, 120px) 0',
        background: 'var(--ink)',
        position: 'relative',
      }}
    >
      <div className="wrap">
        <div
          ref={headRef}
          className={`reveal ${headIn ? 'in-view' : ''}`}
          style={{ marginBottom: 48 }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.16em',
              color: 'var(--citron)',
              textTransform: 'uppercase',
              marginBottom: 14,
              opacity: 0.8,
            }}
          >
            Social Proof
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 800,
              fontSize: 'clamp(28px, 4vw, 48px)',
              color: 'var(--paper)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Delivered, not just promised.
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
            gap: 20,
          }}
        >
          {TESTIMONIALS.map((t, i) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [ref, inView] = useReveal(0.1);
            return (
              <div
                key={i}
                ref={ref}
                className={`reveal ${inView ? 'in-view' : ''}`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(245,244,238,0.07)',
                    borderRadius: 16,
                    padding: '28px 24px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      letterSpacing: '0.12em',
                      color: 'var(--citron)',
                      opacity: 0.7,
                      textTransform: 'uppercase',
                    }}
                  >
                    {t.scope}
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-editorial)',
                      fontStyle: 'italic',
                      fontSize: 16,
                      color: 'var(--paper)',
                      lineHeight: 1.65,
                      margin: 0,
                      flex: 1,
                    }}
                  >
                    "{t.quote}"
                  </p>
                  <div style={{ borderTop: '1px solid rgba(245,244,238,0.07)', paddingTop: 16 }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontWeight: 600,
                        fontSize: 14,
                        color: 'var(--paper)',
                        marginBottom: 2,
                      }}
                    >
                      {t.name}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 12.5,
                        color: 'rgba(245,244,238,0.4)',
                      }}
                    >
                      {t.role}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                        marginTop: 8,
                      }}
                    >
                      <ShieldCheck size={12} color="rgba(216,243,106,0.6)" />
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 10,
                          color: 'rgba(216,243,106,0.55)',
                          letterSpacing: '0.06em',
                        }}
                      >
                        {t.platform}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
