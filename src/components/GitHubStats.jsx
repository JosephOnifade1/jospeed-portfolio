import { useEffect, useState } from 'react';
import { useReveal } from '../hooks/useReveal.js';
import { GithubIcon } from './BrandIcons.jsx';
import { Star, GitFork, BookOpen, Users, Activity } from 'lucide-react';

const GITHUB_USER = 'JosephOnifade1';

function StatPill({ icon: Icon, label, value, color }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 6, padding: '18px 12px',
      background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 12,
      flex: 1, minWidth: 0,
    }}>
      <Icon size={18} color={color || 'var(--indigo-bright)'} />
      <div style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 22, color: 'var(--text)' }}>{value ?? '—'}</div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'center' }}>{label}</div>
    </div>
  );
}

function LangBar({ name, percent, color }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(percent), 100); return () => clearTimeout(t); }, [percent]);
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <span style={{ fontSize: 12.5, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />
          {name}
        </span>
        <span style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--text-faint)' }}>{percent.toFixed(1)}%</span>
      </div>
      <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${w}%`, background: color, borderRadius: 4, transition: 'width 0.8s cubic-bezier(0.16,1,0.3,1)' }} />
      </div>
    </div>
  );
}

const LANG_COLORS = {
  JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3572A5', CSS: '#563d7c',
  HTML: '#e34c26', Shell: '#89e051', MDX: '#fcb32c', Lua: '#000080',
  Rust: '#dea584', Go: '#00ADD8', default: '#6366f1',
};

export default function GitHubStats() {
  const [ref, inView] = useReveal(0.1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!inView || fetched) return;
    setFetched(true);
    setLoading(true);

    Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`).then(r => r.json()),
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`).then(r => r.json()),
    ]).then(([user, repos]) => {
      const validRepos = Array.isArray(repos) ? repos.filter(r => !r.fork) : [];
      const stars = validRepos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
      const forks = validRepos.reduce((acc, r) => acc + (r.forks_count || 0), 0);

      // aggregate languages
      const langMap = {};
      validRepos.forEach(r => { if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1; });
      const total = Object.values(langMap).reduce((a, b) => a + b, 0);
      const langs = Object.entries(langMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 7)
        .map(([name, count]) => ({ name, percent: (count / total) * 100, color: LANG_COLORS[name] || LANG_COLORS.default }));

      setData({ user, repos: validRepos.length, stars, forks, langs });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [inView, fetched]);

  return (
    <div ref={ref} className={`reveal ${inView ? 'in-view' : ''}`}>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '22px 24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--signal)', boxShadow: '0 0 8px var(--signal)' }} />
            <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              github / {GITHUB_USER}
            </span>
          </div>
          <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--cyan)', fontWeight: 600 }}>
            <GithubIcon size={14} color="currentColor" /> View profile →
          </a>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-faint)', fontFamily: 'var(--mono)', fontSize: 13 }}>
            Fetching GitHub data...
          </div>
        )}

        {data && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* Stat pills */}
            <div style={{ display: 'flex', gap: 12 }} className="gh-pills">
              <StatPill icon={BookOpen} label="Public repos" value={data.repos} color="var(--indigo-bright)" />
              <StatPill icon={Star} label="Total stars" value={data.stars} color="#f59e0b" />
              <StatPill icon={GitFork} label="Total forks" value={data.forks} color="var(--cyan)" />
              <StatPill icon={Users} label="Followers" value={data.user?.followers} color="var(--signal)" />
            </div>

            {/* Bio if exists */}
            {data.user?.bio && (
              <div style={{ padding: '12px 16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 14, color: 'var(--text-dim)', fontStyle: 'italic' }}>
                "{data.user.bio}"
              </div>
            )}

            {/* Languages */}
            {data.langs.length > 0 && (
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>
                  Top languages (by repo count)
                </div>
                {data.langs.map(l => <LangBar key={l.name} {...l} />)}
              </div>
            )}
          </div>
        )}

        {!loading && !data && fetched && (
          <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text-faint)', fontSize: 13 }}>
            Could not load GitHub data. <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer" style={{ color: 'var(--cyan)' }}>View profile directly →</a>
          </div>
        )}
      </div>
      <style>{`@media (max-width: 560px) { .gh-pills { flex-wrap: wrap !important; } .gh-pills > div { min-width: calc(50% - 6px) !important; } }`}</style>
    </div>
  );
}
