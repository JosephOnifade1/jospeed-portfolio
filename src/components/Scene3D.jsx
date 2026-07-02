import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const STACK = [
  { label: 'React',      color: '#22d3ee', glow: '#22d3ee' },
  { label: 'Supabase',   color: '#818cf8', glow: '#6366f1' },
  { label: 'n8n',        color: '#22d3ee', glow: '#22d3ee' },
  { label: 'TypeScript', color: '#818cf8', glow: '#6366f1' },
  { label: 'Node.js',    color: '#a3e635', glow: '#a3e635' },
  { label: 'AI Agents',  color: '#a3e635', glow: '#a3e635' },
];

// Draw a premium glass panel texture on canvas
function makePanelTexture(label, color) {
  const S = 3; // retina scale
  const W = 260, H = 80;
  const c = document.createElement('canvas');
  c.width = W * S; c.height = H * S;
  const ctx = c.getContext('2d');
  ctx.scale(S, S);

  const r = 12;
  const hexColor = color;

  // Parse hex to rgb for alpha usage
  const bigint = parseInt(hexColor.replace('#',''), 16);
  const cr = (bigint >> 16) & 255;
  const cg = (bigint >> 8) & 255;
  const cb = bigint & 255;

  // Glass background
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, `rgba(${cr},${cg},${cb},0.12)`);
  bg.addColorStop(1, `rgba(12,13,22,0.88)`);
  roundRect(ctx, 0, 0, W, H, r);
  ctx.fillStyle = bg;
  ctx.fill();

  // Border glow
  roundRect(ctx, 0, 0, W, H, r);
  ctx.strokeStyle = `rgba(${cr},${cg},${cb},0.7)`;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Inner shimmer line at top
  const shimmer = ctx.createLinearGradient(0, 0, W, 0);
  shimmer.addColorStop(0, 'transparent');
  shimmer.addColorStop(0.4, `rgba(${cr},${cg},${cb},0.4)`);
  shimmer.addColorStop(0.6, `rgba(255,255,255,0.3)`);
  shimmer.addColorStop(1, 'transparent');
  ctx.fillStyle = shimmer;
  ctx.fillRect(r, 0, W - r*2, 1.5);

  // Dot indicator
  ctx.fillStyle = `rgba(${cr},${cg},${cb},1)`;
  ctx.beginPath();
  ctx.arc(22, H/2, 5, 0, Math.PI*2);
  ctx.fill();
  // Dot glow
  ctx.fillStyle = `rgba(${cr},${cg},${cb},0.2)`;
  ctx.beginPath();
  ctx.arc(22, H/2, 10, 0, Math.PI*2);
  ctx.fill();

  // Label text
  ctx.font = `600 ${H * 0.38}px "Space Grotesk", "Inter", sans-serif`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.fillStyle = '#f1f5f9';
  ctx.shadowColor = `rgba(${cr},${cg},${cb},0.6)`;
  ctx.shadowBlur = 8;
  ctx.fillText(label, 40, H/2 + 1);
  ctx.shadowBlur = 0;

  const tex = new THREE.CanvasTexture(c);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.needsUpdate = true;
  return tex;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export default function Scene3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const W = mount.clientWidth, H = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 100);
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // ── Core: nested icosahedra ────────────────────────────
    const core1Geo = new THREE.IcosahedronGeometry(0.72, 1);
    const core1Mat = new THREE.MeshBasicMaterial({ color: 0x6366f1, wireframe: true, transparent: true, opacity: 0.9 });
    const core1 = new THREE.Mesh(core1Geo, core1Mat);
    group.add(core1);

    const core2Geo = new THREE.IcosahedronGeometry(0.48, 1);
    const core2Mat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, wireframe: true, transparent: true, opacity: 0.6 });
    const core2 = new THREE.Mesh(core2Geo, core2Mat);
    group.add(core2);

    // Core glow sphere
    const glowGeo = new THREE.SphereGeometry(0.55, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.08 });
    const glowSphere = new THREE.Mesh(glowGeo, glowMat);
    group.add(glowSphere);

    // ── Rings ─────────────────────────────────────────────
    const makeRing = (radius, color, opacity, rx, ry) => {
      const g = new THREE.TorusGeometry(radius, 0.007, 8, 120);
      const m = new THREE.MeshBasicMaterial({ color, transparent: true, opacity });
      const mesh = new THREE.Mesh(g, m);
      mesh.rotation.x = rx; mesh.rotation.y = ry;
      group.add(mesh);
      return mesh;
    };
    const ring1 = makeRing(3.0, 0x6366f1, 0.3, Math.PI/2.2, 0);
    const ring2 = makeRing(3.0, 0x22d3ee, 0.2, Math.PI/1.55, Math.PI/5);
    const ring3 = makeRing(2.2, 0x818cf8, 0.15, Math.PI/3, Math.PI/3);

    // ── Tech panels (sprites) ─────────────────────────────
    const panels = [];
    const lineGroup = new THREE.Group();
    group.add(lineGroup);
    const N = STACK.length;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const RADIUS = 2.2;

    STACK.forEach((item, i) => {
      const yFrac = 1 - (i / (N - 1)) * 1.6 + 0.3;
      const rAtY = Math.sqrt(Math.max(0, 1 - yFrac * yFrac));
      const theta = goldenAngle * i;
      const x = Math.cos(theta) * rAtY * RADIUS;
      const y = yFrac * RADIUS * 0.6;
      const z = Math.sin(theta) * rAtY * RADIUS;

      const tex = makePanelTexture(item.label, item.color);
      const aspect = 260 / 80;
      const ph = 0.72;
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
      const sprite = new THREE.Sprite(mat);
      sprite.scale.set(ph * aspect, ph, 1);
      sprite.position.set(x, y, z);
      sprite.userData = {
        basePos: new THREE.Vector3(x, y, z),
        floatOff: Math.random() * Math.PI * 2,
        floatSpeed: 0.6 + Math.random() * 0.3,
      };
      group.add(sprite);
      panels.push(sprite);

      // Connection line: dashed look via two segments
      const midX = x * 0.5, midY = y * 0.5, midZ = z * 0.5;
      const pts = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(midX, midY, midZ), new THREE.Vector3(x, y, z)];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const bigint2 = parseInt(item.color.replace('#',''), 16);
      const lineMat = new THREE.LineBasicMaterial({
        color: new THREE.Color((bigint2 >> 16)/255, ((bigint2 >> 8)&255)/255, (bigint2&255)/255),
        transparent: true, opacity: 0.35,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      line.userData = { panel: sprite, baseOpacity: 0.35 };
      lineGroup.add(line);

      // Node dot at panel position
      const dotGeo = new THREE.SphereGeometry(0.055, 10, 10);
      const dotMat = new THREE.MeshBasicMaterial({ color: item.color });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(x, y, z);
      dot.userData = { panel: sprite };
      group.add(dot);

      // Dot halo
      const haloGeo = new THREE.SphereGeometry(0.13, 10, 10);
      const haloMat = new THREE.MeshBasicMaterial({ color: item.color, transparent: true, opacity: 0.12 });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      dot.add(halo);
    });

    // ── Background particles ───────────────────────────────
    const PC = 300;
    const pPos = new Float32Array(PC * 3);
    const pColors = new Float32Array(PC * 3);
    const palette = [[0.388, 0.400, 0.945], [0.133, 0.827, 0.933], [0.639, 0.549, 0.984]];
    for (let i = 0; i < PC; i++) {
      pPos[i*3]   = (Math.random()-0.5)*18;
      pPos[i*3+1] = (Math.random()-0.5)*18;
      pPos[i*3+2] = (Math.random()-0.5)*12-4;
      const col = palette[Math.floor(Math.random()*palette.length)];
      pColors[i*3] = col[0]; pColors[i*3+1] = col[1]; pColors[i*3+2] = col[2];
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));
    const pMat = new THREE.PointsMaterial({ size: 0.022, transparent: true, opacity: 0.5, vertexColors: true });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── Drag ──────────────────────────────────────────────
    let dragging = false, prevX = 0, prevY = 0, velX = 0, velY = 0;
    const onDown = (e) => {
      dragging = true; mount.style.cursor = 'grabbing';
      prevX = e.clientX ?? e.touches?.[0]?.clientX;
      prevY = e.clientY ?? e.touches?.[0]?.clientY;
    };
    const onMove = (e) => {
      if (!dragging) return;
      const x = e.clientX ?? e.touches?.[0]?.clientX;
      const y = e.clientY ?? e.touches?.[0]?.clientY;
      velY = (x - prevX) * 0.005; velX = (y - prevY) * 0.005;
      group.rotation.y += velY; group.rotation.x += velX;
      prevX = x; prevY = y;
    };
    const onUp = () => { dragging = false; mount.style.cursor = 'grab'; };
    mount.addEventListener('mousedown', onDown);
    mount.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);

    // ── Animate ───────────────────────────────────────────
    let frameId;
    const clock = new THREE.Clock();
    const tmpV = new THREE.Vector3();

    const animate = () => {
      const t = clock.getElapsedTime();

      if (!prefersReduced) {
        if (!dragging) {
          group.rotation.y += 0.0013 + velY;
          group.rotation.x += velX;
          velY *= 0.93; velX *= 0.93;
        }
        // Counter-rotate inner core for complexity
        core1.rotation.y = t * 0.18;
        core1.rotation.z = t * 0.06;
        core2.rotation.y = -t * 0.24;
        core2.rotation.x = t * 0.12;
        glowSphere.scale.setScalar(1 + Math.sin(t * 1.6) * 0.07);
        ring1.rotation.z = t * 0.11;
        ring2.rotation.z = -t * 0.08;
        ring3.rotation.z = t * 0.06;
        particles.rotation.y = t * 0.008;

        // Float panels + update lines
        panels.forEach((p, i) => {
          const { basePos, floatOff, floatSpeed } = p.userData;
          const float = Math.sin(t * floatSpeed + floatOff) * 0.1;
          p.position.set(basePos.x, basePos.y + float, basePos.z);
        });

        lineGroup.children.forEach((line, i) => {
          const panel = line.userData.panel;
          const pos = line.geometry.attributes.position;
          const midX = panel.position.x * 0.5;
          const midY = panel.position.y * 0.5;
          const midZ = panel.position.z * 0.5;
          pos.setXYZ(1, midX, midY, midZ);
          pos.setXYZ(2, panel.position.x, panel.position.y, panel.position.z);
          pos.needsUpdate = true;
          // Pulse opacity
          line.material.opacity = Math.max(0.08, line.userData.baseOpacity + Math.sin(t * 1.8 + i * 1.1) * 0.18);
        });

        // Sync dot positions
        group.children.forEach(child => {
          if (child.userData?.panel) {
            const p = child.userData.panel;
            if (child.geometry?.type === 'SphereGeometry') {
              child.position.copy(p.position);
            }
          }
        });
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const nW = mount.clientWidth, nH = mount.clientHeight;
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
      renderer.setSize(nW, nH);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
      mount.removeEventListener('mousedown', onDown);
      mount.removeEventListener('touchstart', onDown);
      panels.forEach(p => p.material.map?.dispose());
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%', cursor: 'grab', touchAction: 'none' }} />;
}
