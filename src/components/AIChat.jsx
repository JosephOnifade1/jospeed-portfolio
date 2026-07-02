import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader } from 'lucide-react';

const SYSTEM_PROMPT = `You are Jospeed's AI assistant — a helpful, concise chatbot on Joseph Onifade's portfolio website. You answer questions about his skills, services, availability, rates, and past projects.

KEY FACTS ABOUT JOSPEED:
- Full name: Joseph Onifade. Brand: Jospeed. Handle: @Jospeed7
- Based in Nigeria (Abuja). Works async-only — no calls. Serves US, UK, Canada, EU, UAE clients.
- 4+ years experience. 40+ projects delivered. 15+ happy clients. 5 countries served.

SERVICES & RATES:
- React + Supabase web apps: from $250
- AI chatbot integration (Voiceflow, ManyChat, Landbot): from $150  
- n8n workflow automation: from $120
- 3D rendering & design (Blender, Three.js): from $200
- No-code apps (Lovable, Bubble, Adalo, FlutterFlow): from $100
- Response time: within 2 hours. Delivery: 3–14 days depending on scope.

SKILLS:
- Frontend: React, TypeScript, Next.js, Tailwind CSS, Vite, Framer Motion
- Backend: Node.js, Express, REST APIs
- Database & Cloud: Supabase, PostgreSQL, Firebase, Vercel, Netlify, Railway, Render
- AI & Automation: n8n, Voiceflow, ManyChat, Landbot, Intercom, Claude API, Groq, OpenAI, Vapi, Retell AI, ElevenLabs
- No-code: Lovable, Bubble, Adalo, FlutterFlow, Glide, Webflow
- 3D & Design: Blender, Three.js, React Three Fiber, Figma

PROJECTS:
- Borynx: Reddit-style freelancer community — React + Supabase + TypeScript
- Fiverr Scout: Niche arbitrage terminal — React + Gemini + Supabase
- AI Missed-Call Recovery: Dental clinic lead capture — n8n + Twilio + GoHighLevel
- AI Client Finder Bot: Daily freelance lead delivery — n8n + Groq + Supabase
- HomePlate: Food marketplace for African markets — React + Supabase + Paystack
- AI Strategy Coach: Business coaching app — Lovable + Claude API

WHERE TO HIRE:
- Fiverr: search "Jospeed" 
- Contact form on this site
- Email: hello@jospeed.dev

PERSONALITY: Be helpful, direct, and confident. Keep answers short — 2-4 sentences max unless the person asks for detail. Don't oversell. If asked something you don't know about Joseph, say "I'm not sure — message him directly and he'll respond within 2 hours."`;

const STARTERS = [
  "What's your rate for a web app?",
  "Can you build AI chatbots?",
  "Have you worked with n8n?",
  "Are you available right now?",
];

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hey 👋 I'm Jospeed's AI. Ask me about his services, projects, rates, or availability." },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const send = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;
    setInput('');

    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 300,
          system: SYSTEM_PROMPT,
          messages: newMessages.slice(1).map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "I'm having trouble connecting. Message Jospeed directly at hello@jospeed.dev";
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: "Connection issue. Reach Jospeed directly at hello@jospeed.dev — he replies within 2 hours." }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed',
          bottom: 28,
          right: 28,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: open ? 'var(--surface)' : 'var(--indigo)',
          border: open ? '1px solid var(--border-strong)' : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 200,
          boxShadow: '0 8px 24px -4px rgba(99,102,241,0.5)',
          transition: 'transform 0.25s ease, background 0.25s ease',
          cursor: 'none',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat window */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 96,
            right: 28,
            width: 360,
            maxHeight: 520,
            background: 'var(--surface)',
            border: '1px solid var(--border-strong)',
            borderRadius: 16,
            zIndex: 199,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 24px 48px -12px rgba(0,0,0,0.6)',
            animation: 'chatSlideIn 0.25s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* Header */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--indigo)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, fontFamily: 'var(--display)' }}>J</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Ask Jospeed's AI</div>
              <div style={{ fontSize: 12, color: 'var(--text-faint)', display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--signal)', display: 'inline-block' }} />
                Powered by Claude
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '82%',
                  padding: '10px 14px',
                  borderRadius: m.role === 'user' ? '12px 12px 3px 12px' : '12px 12px 12px 3px',
                  background: m.role === 'user' ? 'var(--indigo)' : 'var(--surface-2)',
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: m.role === 'user' ? '#fff' : 'var(--text)',
                }}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', gap: 6, padding: '8px 4px', alignItems: 'center' }}>
                <Loader size={14} color="var(--text-faint)" style={{ animation: 'spin 1s linear infinite' }} />
                <span style={{ fontSize: 13, color: 'var(--text-faint)' }}>Thinking...</span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick starters — show only at start */}
          {messages.length <= 1 && (
            <div style={{ padding: '0 12px 10px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {STARTERS.map((s) => (
                <button key={s} onClick={() => send(s)} style={{ padding: '6px 12px', borderRadius: 999, border: '1px solid var(--border-strong)', background: 'transparent', color: 'var(--text-dim)', fontSize: 12.5, cursor: 'none', transition: 'border-color 0.2s, color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.color = 'var(--cyan)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--text-dim)'; }}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: '12px 12px', borderTop: '1px solid var(--border)', display: 'flex', gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask anything..."
              style={{ flex: 1, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text)', fontSize: 14, fontFamily: 'var(--body)', outline: 'none' }}
            />
            <button onClick={() => send()} disabled={loading || !input.trim()} style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--indigo)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: loading || !input.trim() ? 0.5 : 1, cursor: 'none', flexShrink: 0 }}>
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes chatSlideIn { from { opacity: 0; transform: translateY(12px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 480px) {
          div[style*="bottom: 96px"] { right: 12px !important; width: calc(100vw - 24px) !important; }
          button[style*="bottom: 28px"] { right: 12px !important; }
        }
      `}</style>
    </>
  );
}
