import { useReveal } from '../hooks/useReveal.js';
import GitHubStats from '../components/GitHubStats.jsx';

const GROUPS = [
  {
    title: 'Frontend',
    color: 'var(--cyan)',
    skills: [
      { name: 'React', level: 95 },
      { name: 'TypeScript', level: 88 },
      { name: 'Next.js', level: 82 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Three.js', level: 74 },
    ],
  },
  {
    title: 'Backend',
    color: 'var(--indigo-bright)',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express', level: 82 },
      { name: 'REST APIs', level: 88 },
      { name: 'GraphQL', level: 70 },
    ],
  },
  {
    title: 'Database & Cloud',
    color: 'var(--cyan)',
    skills: [
      { name: 'Supabase', level: 93 },
      { name: 'PostgreSQL', level: 84 },
      { name: 'Firebase', level: 76 },
      { name: 'Redis', level: 65 },
    ],
  },
  {
    title: 'AI & Automation',
    color: 'var(--signal)',
    skills: [
      { name: 'n8n', level: 90 },
      { name: 'Voiceflow', level: 85 },
      { name: 'ManyChat', level: 80 },
      { name: 'Claude API', level: 88 },
      { name: 'OpenAI API', level: 82 },
      { name: 'Vapi / Retell AI', level: 75 },
      { name: 'ElevenLabs', level: 72 },
    ],
  },
  {
    title: 'No-Code Builders',
    color: 'var(--indigo-bright)',
    skills: [
      { name: 'Lovable.dev', level: 92 },
      { name: 'Bubble', level: 82 },
      { name: 'Adalo', level: 75 },
      { name: 'FlutterFlow', level: 78 },
      { name: 'Glide', level: 70 },
      { name: 'Webflow', level: 68 },
    ],
  },
  {
    title: 'Hosting & DevOps',
    color: 'var(--cyan)',
    skills: [
      { name: 'Vercel', level: 92 },
      { name: 'Netlify', level: 88 },
      { name: 'Railway', level: 80 },
      { name: 'Render', level: 76 },
      { name: 'Cloudflare', level: 70 },
      { name: 'Docker (basics)', level: 62 },
    ],
  },
  {
    title: 'Chat & CRM Tools',
    color: 'var(--signal)',
    skills: [
      { name: 'Tidio', level: 82 },
      { name: 'Intercom', level: 76 },
      { name: 'Landbot', level: 80 },
      { name: 'GoHighLevel', level: 78 },
    ],
  },
  {
    title: 'Design & 3D',
    color: 'var(--indigo-bright)',
    skills: [
      { name: 'Blender', level: 78 },
      { name: 'Figma', level: 72 },
      { name: 'React Three Fiber', level: 70 },
    ],
  },
];

function SkillBar({ name, level, inView, delay, color }) {
  return (
    <div style={{ marginBottom: 13 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <span style={{ fontSize: 13, color: 'var(--text)' }}>{name}</span>
        <span style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--text-faint)' }}>{level}%</span>
      </div>
      <div style={{ height: 4, background: 'rgba(255,255,255,0.04)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: inView ? `${level}%` : 0,
          background: `linear-gradient(90deg, ${color || 'var(--indigo)'}, var(--cyan))`,
          borderRadius: 4,
          transition: `width 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        }} />
      </div>
    </div>
  );
}

function SkillGroup({ group, i }) {
  const [ref, inView] = useReveal(0.15);
  return (
    <div ref={ref} className={`reveal ${inView ? 'in-view' : ''}`} style={{ transitionDelay: `${i * 0.06}s` }}>
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: '18px 16px',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${group.color}, transparent)` }} />
        <h4 style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: group.color, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {group.title}
        </h4>
        {group.skills.map((s, idx) => (
          <SkillBar key={s.name} {...s} inView={inView} delay={idx * 0.08} color={group.color} />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const [headRef, headIn] = useReveal();
  return (
    <section id="skills">
      <div className="wrap">
        <div ref={headRef} className={`reveal ${headIn ? 'in-view' : ''}`} style={{ marginBottom: 48 }}>
          <div className="eyebrow">// Technical Arsenal</div>
          <h2 className={`section-heading ${headIn ? 'in-view' : ''}`}>
            The full stack, and then some.
            <span className="rule" />
          </h2>
          <p style={{ color: 'var(--text-dim)', fontSize: 16, maxWidth: 540, marginTop: 12 }}>
            Frontend to automation, no-code to 3D, hosting to AI agents — every layer of modern product delivery.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 16 }} className="skills-grid">
          {GROUPS.slice(0, 4).map((g, i) => <SkillGroup key={g.title} group={g} i={i} />)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 52 }} className="skills-grid">
          {GROUPS.slice(4).map((g, i) => <SkillGroup key={g.title} group={g} i={i + 4} />)}
        </div>

        <div>
          <div className="eyebrow" style={{ marginBottom: 20 }}>// GitHub Activity</div>
          <GitHubStats />
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) { .skills-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px) { .skills-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
