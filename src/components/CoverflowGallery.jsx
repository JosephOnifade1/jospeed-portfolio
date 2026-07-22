import { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { PROJECTS } from '../data/projects.js';

const DARK  = '#4D2622';
const CREAM = '#F2ECD1';

// Per-project background images (abstract gradient art, no placeholder)
function CardFace({ p, isActive }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      borderRadius: 18,
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      background: DARK,
      border: `1px solid ${isActive ? 'rgba(242,236,209,0.3)' : 'rgba(242,236,209,0.08)'}`,
      boxShadow: isActive
        ? '0 40px 80px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(242,236,209,0.15)'
        : '0 12px 30px rgba(0,0,0,0.5)',
      transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
    }}>
      {/* Gradient band */}
      <div style={{
        height: 200, flexShrink: 0,
        background: p.gradient,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.1)' }} />
        {/* Tag */}
        <div style={{
          position:'absolute', top:14, left:16,
          fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.07em',
          color:'rgba(255,255,255,0.85)', background:'rgba(0,0,0,0.4)',
          border:'1px solid rgba(255,255,255,0.2)', padding:'3px 10px', borderRadius:999,
        }}>{p.tag}</div>
        {/* Project name */}
        <div style={{
          position:'absolute', bottom:18, left:20,
          fontFamily:'var(--display)', fontSize:28, fontWeight:800,
          color:'#fff', letterSpacing:'-0.02em', lineHeight:1.1,
          textShadow:'0 2px 16px rgba(0,0,0,0.6)',
        }}>{p.name}</div>
      </div>

      {/* Body */}
      <div style={{ padding:'20px 22px', flex:1, display:'flex', flexDirection:'column', gap:14 }}>
        <p style={{
          fontSize:13.5, color:'rgba(242,236,209,0.6)', lineHeight:1.7, flex:1,
          display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical', overflow:'hidden',
        }}>{p.description}</p>

        {/* Stack chips */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
          {p.stack.map(s => (
            <span key={s} style={{
              fontFamily:'var(--mono)', fontSize:10.5,
              color: CREAM, background:'rgba(242,236,209,0.08)',
              border:'1px solid rgba(242,236,209,0.18)',
              padding:'3px 9px', borderRadius:5,
            }}>{s}</span>
          ))}
        </div>

        {/* CTA — only fully interactive on active card */}
        <div style={{ display:'flex', gap:8 }}>
          <button
            onClick={e => { e.stopPropagation(); if (isActive) window.location.href = `/case-study/${p.id}`; }}
            style={{
              flex:1, padding:'10px 0', borderRadius:8,
              background: isActive ? CREAM : 'rgba(242,236,209,0.08)',
              color: isActive ? DARK : 'rgba(242,236,209,0.4)',
              border:'none', fontFamily:'var(--body)', fontSize:13, fontWeight:700,
              cursor: isActive ? 'pointer' : 'default',
              display:'flex', alignItems:'center', justifyContent:'center', gap:5,
              transition:'background 0.3s, color 0.3s',
            }}
          >Case study <ArrowUpRight size={13} /></button>
          <a
            href={isActive ? (p.live || p.github || '#') : '#'}
            onClick={e => { if (!isActive) e.preventDefault(); }}
            style={{
              padding:'10px 14px', borderRadius:8,
              background:'transparent',
              border:`1px solid ${isActive ? 'rgba(242,236,209,0.25)' : 'rgba(242,236,209,0.08)'}`,
              color: isActive ? 'rgba(242,236,209,0.7)' : 'rgba(242,236,209,0.2)',
              fontFamily:'var(--body)', fontSize:13, fontWeight:500,
              cursor: isActive ? 'pointer' : 'default',
              textDecoration:'none', display:'flex', alignItems:'center',
              transition:'all 0.3s',
            }}
          >{p.live ? 'Live ↗' : 'Code ↗'}</a>
        </div>
      </div>
    </div>
  );
}

export default function CoverflowGallery() {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const n = PROJECTS.length;

  const goTo = useCallback(i => setActive(((i % n) + n) % n), [n]);
  const prev = () => goTo(active - 1);
  const next = () => goTo(active + 1);

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const onDragStart = e => {
    setDragging(false);
    startX.current = e.clientX ?? e.touches?.[0]?.clientX;
  };
  const onDragEnd = e => {
    const endX = e.clientX ?? e.changedTouches?.[0]?.clientX;
    const diff = startX.current - endX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
  };

  // Compute transform for each card
  const getStyle = i => {
    let offset = i - active;
    // Wrap offset so we always show ±2 neighbors
    if (offset >  n/2) offset -= n;
    if (offset < -n/2) offset += n;

    const abs = Math.abs(offset);
    if (abs > 2) return { display:'none' }; // hide far cards

    const isActive = offset === 0;
    // X spread: active = 0, ±1 = ±340px, ±2 = ±600px
    const tx = offset * 310;
    // Z depth: active comes forward
    const tz = isActive ? 0 : -180 - abs * 80;
    // Y rotation — coverflow signature tilt
    const ry = offset * -42;
    // Scale
    const scale = isActive ? 1 : Math.max(0.72, 1 - abs * 0.14);
    // Opacity
    const opacity = abs === 0 ? 1 : abs === 1 ? 0.6 : 0.3;
    const zIndex = 10 - abs;

    return {
      position:'absolute', top:'50%', left:'50%',
      width: 360, height: 460,
      marginLeft: -180, marginTop: -230,
      transform: `translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`,
      opacity,
      zIndex,
      cursor: isActive ? 'default' : 'pointer',
      transition: dragging ? 'none' : 'transform 0.55s cubic-bezier(.22,1,.36,1), opacity 0.45s ease',
      willChange: 'transform, opacity',
    };
  };

  return (
    <div style={{ position:'relative', width:'100%' }}>
      {/* Stage */}
      <div
        style={{
          position:'relative', height:520, overflow:'hidden',
          perspective:1100, perspectiveOrigin:'50% 46%',
          cursor:'grab',
        }}
        onMouseDown={onDragStart} onMouseUp={onDragEnd}
        onTouchStart={onDragStart} onTouchEnd={onDragEnd}
      >
        <div style={{ position:'absolute', inset:0, transformStyle:'preserve-3d' }}>
          {PROJECTS.map((p, i) => (
            <div key={p.id} style={getStyle(i)} onClick={() => { const o = (() => { let d = i - active; if (d > n/2) d -= n; if (d < -n/2) d += n; return d; })(); if (o !== 0) goTo(i); }}>
              <CardFace p={p} isActive={i === active} />
            </div>
          ))}
        </div>

        {/* Reflection / ground shadow */}
        <div style={{
          position:'absolute', bottom:0, left:'5%', right:'5%', height:60,
          background:'linear-gradient(to top, rgba(77,38,34,0.15), transparent)',
          pointerEvents:'none', borderRadius:'0 0 16px 16px',
        }} />
      </div>

      {/* Controls row */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:20, marginTop:24 }}>
        <button onClick={prev} style={{
          width:42, height:42, borderRadius:'50%', border:'1px solid rgba(77,38,34,0.25)',
          background:'rgba(77,38,34,0.08)', color:DARK, cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center',
          transition:'background 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(77,38,34,0.18)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(77,38,34,0.08)'}
        ><ChevronLeft size={18} /></button>

        {/* Dot indicators */}
        <div style={{ display:'flex', gap:8, alignItems:'center' }}>
          {PROJECTS.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{
              width: i === active ? 24 : 8,
              height:8, borderRadius:4, border:'none', padding:0, cursor:'pointer',
              background: i === active ? DARK : 'rgba(77,38,34,0.25)',
              transition:'all 0.35s cubic-bezier(.22,1,.36,1)',
            }} />
          ))}
        </div>

        <button onClick={next} style={{
          width:42, height:42, borderRadius:'50%', border:'1px solid rgba(77,38,34,0.25)',
          background:'rgba(77,38,34,0.08)', color:DARK, cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center',
          transition:'background 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(77,38,34,0.18)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(77,38,34,0.08)'}
        ><ChevronRight size={18} /></button>
      </div>

      {/* Project counter */}
      <div style={{ textAlign:'center', marginTop:12, fontFamily:'var(--mono)', fontSize:12, color:'rgba(77,38,34,0.4)' }}>
        {String(active + 1).padStart(2,'0')} / {String(n).padStart(2,'0')}
      </div>
    </div>
  );
}
