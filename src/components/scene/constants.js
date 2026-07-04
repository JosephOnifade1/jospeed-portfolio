// 6 cards on 2 orbits max — give them room to breathe
// Phases are evenly distributed so cards never pile up
export const TECH = [
  { label: 'React',      color: '#22d3ee', glow: 'rgba(34,211,238,0.4)',  orbit: 0, speed: 0.22, phase: 0 },
  { label: 'TypeScript', color: '#818cf8', glow: 'rgba(129,140,248,0.4)', orbit: 1, speed: 0.17, phase: 1.05 },
  { label: 'Supabase',   color: '#3b82f6', glow: 'rgba(59,130,246,0.4)',  orbit: 0, speed: 0.22, phase: 2.09 },
  { label: 'Node.js',    color: '#4ade80', glow: 'rgba(74,222,128,0.4)',  orbit: 1, speed: 0.17, phase: 3.14 },
  { label: 'AI Agents',  color: '#a3e635', glow: 'rgba(163,230,53,0.4)',  orbit: 0, speed: 0.22, phase: 4.19 },
  { label: 'n8n',        color: '#fb923c', glow: 'rgba(251,146,60,0.4)',  orbit: 1, speed: 0.17, phase: 5.24 },
];

// Two generous orbits — large enough so cards spread wide
export const ORBITS = [
  { rx: 230, ry: 72,  tilt: -14, spinSpeed: 0.008  },
  { rx: 185, ry: 58,  tilt: 20,  spinSpeed: -0.006 },
];

export const LERP = (a, b, t) => a + (b - a) * t;
