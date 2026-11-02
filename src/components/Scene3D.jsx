import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Scene3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = mount.clientWidth;
    let H = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 100);
    camera.position.set(0, 0, 7.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mount.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // ── Lighting ──────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const neonPointLight = new THREE.PointLight(0xD8F36A, 4, 12);
    neonPointLight.position.set(1.5, 1.8, 2.5);
    scene.add(neonPointLight);

    const rimLight = new THREE.DirectionalLight(0xD8F36A, 1.8);
    rimLight.position.set(-3, 3, 2);
    scene.add(rimLight);

    // ── Centerpiece: Cyber David Bust ─────────────────────
    const textureLoader = new THREE.TextureLoader();
    let bustMesh = null;
    textureLoader.load('/cyber-david-bust-feathered.png', (tex) => {
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;

      const bustGeo = new THREE.PlaneGeometry(3.1, 4.3);
      const bustMat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        opacity: 0.98,
        depthWrite: false,
      });
      bustMesh = new THREE.Mesh(bustGeo, bustMat);
      bustMesh.position.set(0, -0.1, 0);
      mainGroup.add(bustMesh);
    });

    // ── Glowing Neon Arc / Ring Behind Bust ───────────────
    const ringGeo = new THREE.TorusGeometry(1.9, 0.018, 16, 100, Math.PI * 1.7);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xD8F36A,
      transparent: true,
      opacity: 0.75,
    });
    const neonRing = new THREE.Mesh(ringGeo, ringMat);
    neonRing.rotation.z = Math.PI * 0.15;
    neonRing.position.set(0, 0.1, -0.3);
    mainGroup.add(neonRing);

    // Secondary inner wireframe halo
    const innerRingGeo = new THREE.TorusGeometry(1.4, 0.008, 16, 80);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0xD8F36A,
      transparent: true,
      opacity: 0.35,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.position.set(0, 0.1, -0.4);
    mainGroup.add(innerRing);

    // ── Floating 3D Geometric Cubes & Solids ──────────────
    const floatingObjects = [];

    const createFloatingCube = (size, x, y, z, rotSpeedX, rotSpeedY) => {
      const cubeGroup = new THREE.Group();
      
      // Glass body
      const bodyGeo = new THREE.BoxGeometry(size, size, size);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: 0x121610,
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.75,
      });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      cubeGroup.add(body);

      // Glowing edges
      const edges = new THREE.EdgesGeometry(bodyGeo);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xD8F36A,
        transparent: true,
        opacity: 0.9,
      });
      const wireframe = new THREE.LineSegments(edges, lineMat);
      cubeGroup.add(wireframe);

      cubeGroup.position.set(x, y, z);
      cubeGroup.userData = {
        basePos: new THREE.Vector3(x, y, z),
        rotX: rotSpeedX,
        rotY: rotSpeedY,
        floatSpeed: 0.8 + Math.random() * 0.6,
        floatOffset: Math.random() * Math.PI * 2,
      };

      mainGroup.add(cubeGroup);
      floatingObjects.push(cubeGroup);
      return cubeGroup;
    };

    // Spawn 5 floating cubes placed strategically matching the reference
    createFloatingCube(0.44,  1.75,  0.8,  0.6, 0.012, 0.015);
    createFloatingCube(0.32,  1.9,  -0.9,  0.4, 0.015, -0.01);
    createFloatingCube(0.28, -1.8,   0.9,  0.5, -0.01, 0.012);
    createFloatingCube(0.22, -1.6,  -0.8,  0.3, 0.018, 0.01);
    createFloatingCube(0.36,  0.2,   1.95, -0.2, 0.008, 0.014);

    // Wireframe Icosahedron (symbolizing creative engineering & exploration)
    const icoGeo = new THREE.IcosahedronGeometry(0.32, 0);
    const icoEdges = new THREE.EdgesGeometry(icoGeo);
    const icoLineMat = new THREE.LineBasicMaterial({ color: 0xD8F36A, transparent: true, opacity: 0.85 });
    const icoMesh = new THREE.LineSegments(icoEdges, icoLineMat);
    icoMesh.position.set(-1.45, -0.2, 0.8);
    icoMesh.userData = {
      basePos: new THREE.Vector3(-1.45, -0.2, 0.8),
      rotX: 0.015,
      rotY: 0.02,
      floatSpeed: 1.1,
      floatOffset: 1.5,
    };
    mainGroup.add(icoMesh);
    floatingObjects.push(icoMesh);

    // ── Floating Stardust Particles ───────────────────────
    const particleCount = 120;
    const pPositions = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3]     = (Math.random() - 0.5) * 8;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 4 - 0.5;

      // Mix citron and paper white
      if (Math.random() > 0.4) {
        pColors[i * 3]     = 0.84; // 216/255
        pColors[i * 3 + 1] = 0.95; // 243/255
        pColors[i * 3 + 2] = 0.41; // 106/255
      } else {
        pColors[i * 3]     = 0.96;
        pColors[i * 3 + 1] = 0.95;
        pColors[i * 3 + 2] = 0.93;
      }
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── Mouse & Touch Parallax / Inertia ───────────────────
    let mouseX = 0, mouseY = 0;
    let targetRotX = 0, targetRotY = 0;
    let isDragging = false;
    let startX = 0, startY = 0;
    let currentRotX = 0, currentRotY = 0;

    const handlePointerMove = (e) => {
      const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
      const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;

      const normX = (clientX / window.innerWidth) * 2 - 1;
      const normY = -(clientY / window.innerHeight) * 2 + 1;

      if (isDragging) {
        const deltaX = (clientX - startX) * 0.005;
        const deltaY = (clientY - startY) * 0.005;
        currentRotY += deltaX;
        currentRotX -= deltaY;
        startX = clientX;
        startY = clientY;
      } else {
        mouseX = normX * 0.25;
        mouseY = normY * 0.18;
      }
    };

    const handlePointerDown = (e) => {
      isDragging = true;
      startX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
      startY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
      if (mount) mount.style.cursor = 'grabbing';
    };

    const handlePointerUp = () => {
      isDragging = false;
      if (mount) mount.style.cursor = 'grab';
    };

    window.addEventListener('mousemove', handlePointerMove);
    mount.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);

    mount.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // ── Animation Loop ────────────────────────────────────
    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      if (!prefersReduced) {
        targetRotX = currentRotX + mouseY;
        targetRotY = currentRotY + mouseX;

        mainGroup.rotation.x += (targetRotX - mainGroup.rotation.x) * 0.05;
        mainGroup.rotation.y += (targetRotY - mainGroup.rotation.y) * 0.05;

        // Subtle gentle breathing pulse on neon ring
        neonRing.rotation.z = Math.PI * 0.15 + Math.sin(elapsedTime * 0.4) * 0.08;
        neonRing.material.opacity = 0.65 + Math.sin(elapsedTime * 1.5) * 0.15;
        neonPointLight.intensity = 3.5 + Math.sin(elapsedTime * 2) * 0.8;

        // Animate floating cubes
        floatingObjects.forEach((obj) => {
          const { basePos, rotX, rotY, floatSpeed, floatOffset } = obj.userData;
          obj.rotation.x += rotX;
          obj.rotation.y += rotY;
          obj.position.y = basePos.y + Math.sin(elapsedTime * floatSpeed + floatOffset) * 0.08;
        });

        // Slow particle orbit
        particles.rotation.y = elapsedTime * 0.02;
      }

      renderer.render(scene, camera);
      if (isVisible) {
        frameId = requestAnimationFrame(animate);
      } else {
        frameId = null;
      }
    };

    // ── Visibility & Resize ───────────────────────────────
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !frameId) {
          frameId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.02 }
    );
    observer.observe(mount);

    // Initial trigger
    frameId = requestAnimationFrame(animate);

    const onResize = () => {
      if (!mount) return;
      W = mount.clientWidth;
      H = mount.clientHeight;
      camera.aspect = W / H;

      // Adjust camera distance for mobile responsiveness
      if (W < 600) {
        camera.position.z = 8.5;
      } else if (W < 900) {
        camera.position.z = 8.0;
      } else {
        camera.position.z = 7.8;
      }

      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener('resize', onResize);
    onResize();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      if (mount) {
        mount.removeEventListener('mousedown', handlePointerDown);
        mount.removeEventListener('touchstart', handlePointerDown);
      }
      renderer.dispose();
      if (mount && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '100%',
        cursor: 'grab',
        touchAction: 'none',
        position: 'relative',
      }}
    />
  );
}
