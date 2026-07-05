import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const STACK = [
  { label: 'React',      color: '#c9922a', glow: '#c9922a' },
  { label: 'TypeScript', color: '#f0e8d5', glow: '#f0e8d5' },
  { label: 'Supabase',   color: '#c0392b', glow: '#c0392b' },
  { label: 'Node.js',    color: '#c9922a', glow: '#c9922a' },
  { label: 'n8n',        color: '#f0e8d5', glow: '#f0e8d5' },
  { label: 'AI Agents',  color: '#c0392b', glow: '#c0392b' },
  { label: 'Voiceflow',  color: '#c9922a', glow: '#c9922a' },
  { label: 'Blender',    color: '#f0e8d5', glow: '#f0e8d5' },
];

// Manual positions — evenly distributed on a sphere, no clustering
// Each point is hand-placed so nothing overlaps at t=0
const POSITIONS = [
  { x:  2.0,  y:  1.1,  z:  0.4 },
  { x: -2.1,  y:  0.9,  z: -0.3 },
  { x:  0.5,  y:  1.8,  z: -1.6 },
  { x: -0.4,  y: -1.8,  z:  1.5 },
  { x:  1.8,  y: -1.0,  z: -1.2 },
  { x: -1.7,  y: -1.1,  z:  1.1 },
  { x:  0.3,  y:  0.8,  z:  2.2 },
  { x: -0.2,  y: -0.7,  z: -2.3 },
];

function makePanelTexture(label, color) {
  const S = 3;
  const W = 260, H = 80;
  const c = document.createElement('canvas');
  c.width = W * S; c.height = H * S;
  const ctx = c.getContext('2d');
  ctx.scale(S, S);

  const r = 12;
  const bigint = parseInt(color.replace('#',''), 16);
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

  // Border
  roundRect(ctx, 0, 0, W, H, r);
  ctx.strokeStyle = `rgba(${cr},${cg},${cb},0.7)`;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Shimmer line at top
  const shimmer = ctx.createLinearGradient(0, 0, W, 0);
  shimmer.addColorStop(0, 'transparent');
  shimmer.addColorStop(0.4, `rgba(${cr},${cg},${cb},0.4)`);
  shimmer.addColorStop(0.6, `rgba(255,255,255,0.3)`);
  shimmer.addColorStop(1, 'transparent');
  ctx.fillStyle = shimmer;
  ctx.fillRect(r, 0, W - r*2, 1.5);

  // Dot
  ctx.fillStyle = `rgba(${cr},${cg},${cb},1)`;
  ctx.beginPath();
  ctx.arc(22, H/2, 5, 0, Math.PI*2);
  ctx.fill();
  ctx.fillStyle = `rgba(${cr},${cg},${cb},0.2)`;
  ctx.beginPath();
  ctx.arc(22, H/2, 10, 0, Math.PI*2);
  ctx.fill();

  // Label
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

      const tex    = makePanelTexture(item.label, item.color);
      const aspect = 260 / 80;
      const ph     = 0.72;
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
          p.position.set(basePos.x, basePos.y + Math.sin(t * floatSpeed + floatOff) * 0.1, basePos.z);
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
