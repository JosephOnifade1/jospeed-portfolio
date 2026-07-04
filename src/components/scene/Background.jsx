import { useEffect, useRef } from 'react';

export default function Background({ width, height }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width  = width  || canvas.offsetWidth;
    canvas.height = height || canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;

    // Stars
    const stars = Array.from({ length: 90 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 0.8 + 0.2,
      a: Math.random() * 0.25 + 0.05,
      da: (Math.random() - 0.5) * 0.003,
    }));

    // Slow drifting particles
    const drifters = Array.from({ length: 18 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      r: Math.random() * 1.2 + 0.4,
      a: Math.random() * 0.12,
    }));

    let frameId;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Radial vignette
      const rg = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, W * 0.7);
      rg.addColorStop(0,   'rgba(99,102,241,0.04)');
      rg.addColorStop(0.5, 'rgba(7,7,12,0)');
      rg.addColorStop(1,   'rgba(3,3,5,0.4)');
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, W, H);

      // Stars
      stars.forEach(s => {
        s.a += s.da;
        if (s.a > 0.3 || s.a < 0.03) s.da *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,190,255,${s.a})`;
        ctx.fill();
      });

      // Drifters
      drifters.forEach(d => {
        d.x = (d.x + d.vx + W) % W;
        d.y = (d.y + d.vy + H) % H;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${d.a})`;
        ctx.fill();
      });

      frameId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frameId);
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
}
