import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const STACK = [
  { label: 'React',      color: '#c9922a', accent: '#e8b84b' },
  { label: 'TypeScript', color: '#F2ECD1', accent: '#ffffff' },
  { label: 'Supabase',   color: '#c0392b', accent: '#e05444' },
  { label: 'Node.js',    color: '#8fba6a', accent: '#a8d47f' },
  { label: 'n8n',        color: '#F2ECD1', accent: '#ffffff' },
  { label: 'AI Agents',  color: '#c9922a', accent: '#e8b84b' },
  { label: 'Voiceflow',  color: '#9b6dcc', accent: '#b88de0' },
  { label: 'Blender',    color: '#e07b39', accent: '#f09555' },
];

// Saff-Kuijlaars algorithm — guaranteed equal angular spacing, zero overlap
// R = sphere radius for panel placement
const R = 2.35;
const POSITIONS = (() => {
  const n = STACK.length;
  const pts = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push({
      x: Math.cos(theta) * r * R,
      y: y * R * 0.85,          // compress Y slightly so top/bottom don't clip hero
      z: Math.sin(theta) * r * R,
    });
  }
  return pts;
})();

function makePanelTexture(label, color, accent) {
  const S = 4;
  const W = 280, H = 88;
  const c = document.createElement('canvas');
  c.width = W * S; c.height = H * S;
  const ctx = c.getContext('2d');
  ctx.scale(S, S);

  const hex = parseInt(color.replace('#',''), 16);
  const cr = (hex >> 16) & 255;
  const cg = (hex >> 8)  & 255;
  const cb =  hex        & 255;
  const hexA = parseInt((accent || color).replace('#',''), 16);
  const ar = (hexA >> 16) & 255;
  const ag = (hexA >> 8)  & 255;
  const ab =  hexA        & 255;
  const r = 14;

  // Deep glass base — dark burgundy tinted by tool color
  const bg = ctx.createLinearGradient(0, 0, W * 0.7, H);
  bg.addColorStop(0, `rgba(${Math.min(cr+18,255)},${Math.min(cg+8,100)},${Math.min(cb+8,80)},0.22)`);
  bg.addColorStop(0.5, `rgba(58,18,16,0.82)`);
  bg.addColorStop(1,   `rgba(36,10,10,0.90)`);
  roundRect(ctx, 0, 0, W, H, r);
  ctx.fillStyle = bg;
  ctx.fill();

  // Primary border — colored
  roundRect(ctx, 0, 0, W, H, r);
  ctx.strokeStyle = `rgba(${cr},${cg},${cb},0.75)`;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Inner inset border — very faint white for depth
  roundRect(ctx, 1, 1, W-2, H-2, r-1);
  ctx.strokeStyle = `rgba(255,255,255,0.06)`;
  ctx.lineWidth = 1;
  ctx.stroke();

  // Top shimmer — light refraction line
  const shimmer = ctx.createLinearGradient(r, 0, W - r, 0);
  shimmer.addColorStop(0,    'rgba(255,255,255,0)');
  shimmer.addColorStop(0.25, `rgba(${ar},${ag},${ab},0.55)`);
  shimmer.addColorStop(0.5,  'rgba(255,255,255,0.45)');
  shimmer.addColorStop(0.75, `rgba(${ar},${ag},${ab},0.35)`);
  shimmer.addColorStop(1,    'rgba(255,255,255,0)');
  ctx.fillStyle = shimmer;
  ctx.fillRect(r, 0, W - r*2, 1.8);

  // Bottom subtle reflection
  const botShimmer = ctx.createLinearGradient(r, H, W - r, H);
  botShimmer.addColorStop(0,   'rgba(255,255,255,0)');
  botShimmer.addColorStop(0.5, `rgba(${cr},${cg},${cb},0.12)`);
  botShimmer.addColorStop(1,   'rgba(255,255,255,0)');
  ctx.fillStyle = botShimmer;
  ctx.fillRect(r, H - 1.5, W - r*2, 1.5);

  // Left accent stripe
  const stripe = ctx.createLinearGradient(0, 0, 0, H);
  stripe.addColorStop(0,   `rgba(${cr},${cg},${cb},0.9)`);
  stripe.addColorStop(0.5, `rgba(${ar},${ag},${ab},0.6)`);
  stripe.addColorStop(1,   `rgba(${cr},${cg},${cb},0.2)`);
  ctx.fillStyle = stripe;
  roundRect(ctx, 0, 0, 3.5, H, r);
  ctx.fill();

  // Dot — glowing
  ctx.fillStyle = `rgba(${cr},${cg},${cb},1)`;
  ctx.shadowColor = `rgba(${cr},${cg},${cb},0.9)`;
  ctx.shadowBlur = 8;
  ctx.beginPath();
  ctx.arc(26, H/2, 5.5, 0, Math.PI*2);
  ctx.fill();
  ctx.shadowBlur = 0;

  // Dot outer ring
  ctx.strokeStyle = `rgba(${cr},${cg},${cb},0.3)`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(26, H/2, 10, 0, Math.PI*2);
  ctx.stroke();

  // Label — main text with subtle shadow
  ctx.font = `700 ${H * 0.39}px "Space Grotesk", "Inter", sans-serif`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.shadowColor = `rgba(${cr},${cg},${cb},0.4)`;
  ctx.shadowBlur = 12;
  ctx.fillStyle = '#F2ECD1';
  ctx.fillText(label, 48, H/2 + 1);
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
    const camera = new THREE.PerspectiveCamera(36, W / H, 0.1, 100);
    camera.position.set(0, 0, 12);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Core: nested icosahedra
    const core1 = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.72, 1),
      new THREE.MeshBasicMaterial({ color: 0x8b1a1a, wireframe: true, transparent: true, opacity: 0.9 })
    );
    group.add(core1);

    const core2 = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.48, 1),
      new THREE.MeshBasicMaterial({ color: 0xc9922a, wireframe: true, transparent: true, opacity: 0.6 })
    );
    group.add(core2);

    const glowSphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.55, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x8b1a1a, transparent: true, opacity: 0.08 })
    );
    group.add(glowSphere);

    // Rings
    const makeRing = (radius, color, opacity, rx, ry) => {
      const mesh = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.007, 8, 120),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity })
      );
      mesh.rotation.x = rx; mesh.rotation.y = ry;
      group.add(mesh);
      return mesh;
    };
    const ring1 = makeRing(3.0, 0x8b1a1a, 0.3,  Math.PI/2.2, 0);
    const ring2 = makeRing(3.0, 0xc9922a, 0.2,  Math.PI/1.55, Math.PI/5);
    const ring3 = makeRing(2.2, 0xc0392b, 0.15, Math.PI/3,    Math.PI/3);

    // Tech panels — manually positioned so nothing clusters at t=0
    const panels = [];
    const lineGroup = new THREE.Group();
    group.add(lineGroup);

    STACK.forEach((item, i) => {
      const { x, y, z } = POSITIONS[i];

      const tex    = makePanelTexture(item.label, item.color, item.accent);
      const aspect = 280 / 88;
      const ph     = 0.82;
      const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false })
      );
      sprite.scale.set(ph * aspect, ph, 1);
      sprite.position.set(x, y, z);
      sprite.userData = {
        basePos: new THREE.Vector3(x, y, z),
        floatOff: Math.random() * Math.PI * 2,
        floatSpeed: 0.6 + Math.random() * 0.3,
      };
      group.add(sprite);
      panels.push(sprite);

      // Connection line
      const pts = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(x * 0.5, y * 0.5, z * 0.5),
        new THREE.Vector3(x, y, z),
      ];
      const bigint2 = parseInt(item.color.replace('#',''), 16);
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({
          color: new THREE.Color((bigint2>>16)/255, ((bigint2>>8)&255)/255, (bigint2&255)/255),
          transparent: true, opacity: 0.35,
        })
      );
      line.userData = { panel: sprite, baseOpacity: 0.35 };
      lineGroup.add(line);

      // Dot node
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.055, 10, 10),
        new THREE.MeshBasicMaterial({ color: item.color })
      );
      dot.position.set(x, y, z);
      dot.userData = { panel: sprite };
      group.add(dot);

      // Dot halo
      dot.add(new THREE.Mesh(
        new THREE.SphereGeometry(0.13, 10, 10),
        new THREE.MeshBasicMaterial({ color: item.color, transparent: true, opacity: 0.12 })
      ));
    });

    // Background particles
    const PC = 300;
    const pPos    = new Float32Array(PC * 3);
    const pColors = new Float32Array(PC * 3);
    const palette = [[0.545,0.102,0.102],[0.788,0.573,0.165],[0.941,0.910,0.835]];
    for (let i = 0; i < PC; i++) {
      pPos[i*3]   = (Math.random()-.5)*18;
      pPos[i*3+1] = (Math.random()-.5)*18;
      pPos[i*3+2] = (Math.random()-.5)*12-4;
      const col = palette[Math.floor(Math.random()*3)];
      pColors[i*3]=col[0]; pColors[i*3+1]=col[1]; pColors[i*3+2]=col[2];
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color',    new THREE.BufferAttribute(pColors, 3));
    const particles = new THREE.Points(pGeo,
      new THREE.PointsMaterial({ size: 0.022, transparent: true, opacity: 0.5, vertexColors: true })
    );
    scene.add(particles);

    // Drag
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

    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();
      if (!prefersReduced) {
        if (!dragging) {
          group.rotation.y += 0.0013 + velY;
          group.rotation.x += velX;
          velY *= 0.93; velX *= 0.93;
        }
        core1.rotation.y = t * 0.18; core1.rotation.z = t * 0.06;
        core2.rotation.y = -t * 0.24; core2.rotation.x = t * 0.12;
        glowSphere.scale.setScalar(1 + Math.sin(t * 1.6) * 0.07);
        ring1.rotation.z = t * 0.11;
        ring2.rotation.z = -t * 0.08;
        ring3.rotation.z = t * 0.06;
        particles.rotation.y = t * 0.008;

        panels.forEach(p => {
          const { basePos, floatOff, floatSpeed } = p.userData;
          p.position.set(basePos.x, basePos.y + Math.sin(t * floatSpeed + floatOff) * 0.06, basePos.z);
        });

        lineGroup.children.forEach((line, i) => {
          const panel = line.userData.panel;
          const pos = line.geometry.attributes.position;
          pos.setXYZ(1, panel.position.x*.5, panel.position.y*.5, panel.position.z*.5);
          pos.setXYZ(2, panel.position.x, panel.position.y, panel.position.z);
          pos.needsUpdate = true;
          line.material.opacity = Math.max(0.08,
            line.userData.baseOpacity + Math.sin(t * 1.8 + i * 1.1) * 0.18
          );
        });

        group.children.forEach(child => {
          if (child.userData?.panel && child.geometry?.type === 'SphereGeometry') {
            child.position.copy(child.userData.panel.position);
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

  return (
    <div ref={mountRef} style={{ width: '100%', height: '100%', cursor: 'grab', touchAction: 'none' }} />
  );
}
