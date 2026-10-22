"use client"

import * as React from "react"
import { useEffect, useRef } from "react"
import * as THREE from "three"

const MAX_FLOWERS = 9

const RANK_SHRINK = 0.82

const RANK_SINK = 0.09

const PETAL_FULLNESS = 0.92

const LINE_WEIGHT = 1

type Sides = {
    top: boolean
    bottom: boolean
    left: boolean
    right: boolean
}

const DEFAULT_SIDES: Sides = {
    top: true,
    bottom: true,
    left: false,
    right: false,
}

const DEFAULTS = {
    petal: "#F2879F",
    line: "#3A1730",
    heart: "#FFD166",
    sides: { top: false, left: true, right: true, bottom: false },
    flowers: 9,
    petals: 5,
    size: 15,
    point: 14,
    spread: 100,
    sway: 20,
}

type Config = {
    petal: string
    line: string
    heart: string
    sides: Sides
    flowers: number
    petals: number
    size: number
    point: number
    spread: number
    sway: number
}

function clamp(v: number, lo: number, hi: number, fallback: number): number {
    const n = typeof v === "number" && isFinite(v) ? v : fallback
    return Math.max(lo, Math.min(hi, n))
}

function toOklab(hex: string, fallback: string): THREE.Vector3 {
    const c = new THREE.Color(hex || fallback)
    const l = Math.cbrt(0.4122214708 * c.r + 0.5363325363 * c.g + 0.0514459929 * c.b)
    const m = Math.cbrt(0.2119034982 * c.r + 0.6806995451 * c.g + 0.1073969566 * c.b)
    const s = Math.cbrt(0.0883024619 * c.r + 0.2817188376 * c.g + 0.6299787005 * c.b)
    return new THREE.Vector3(
        0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
        1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
        0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
    )
}

function settingsFor(cfg: Config) {
    const sides: Sides = { ...DEFAULT_SIDES, ...(cfg.sides || {}) }

    return {
        sides: [
            sides.top ? 1 : 0,
            sides.bottom ? 1 : 0,
            sides.left ? 1 : 0,
            sides.right ? 1 : 0,
        ] as [number, number, number, number],

        flowers: Math.round(clamp(cfg.flowers, 1, MAX_FLOWERS, DEFAULTS.flowers)),

        petals: Math.round(clamp(cfg.petals, 5, 16, DEFAULTS.petals)),

        size: 0.06 + clamp(cfg.size, 1, 20, DEFAULTS.size) * 0.013,

        point: 0.5 + clamp(cfg.point, 1, 20, DEFAULTS.point) * 0.11,

        spread: clamp(cfg.spread, 0, 100, DEFAULTS.spread) / 100,

        sway: clamp(cfg.sway, 0, 20, DEFAULTS.sway) * 0.018,
    }
}

const QUAD_VERTEX =  `
    varying vec2 vUv;
    void main() {
        vUv = uv;

        gl_Position = vec4(position.xy, 0.0, 1.0);
    }
`

const BORDER_FRAGMENT =  `
    precision highp float;

    #define MAX_FLOWERS ${MAX_FLOWERS}
    #define RANK_SHRINK ${RANK_SHRINK}
    #define RANK_SINK ${RANK_SINK}
    #define FULLNESS ${PETAL_FULLNESS}
    #define TAU 6.28318530718
    #define PI 3.14159265359

    uniform vec2 uResolution;
    uniform float uTime;
    uniform vec3 uPetal;
    uniform vec3 uLine;
    uniform vec3 uHeart;
    uniform vec4 uSides;
    uniform float uCount;
    uniform float uPetals;
    uniform float uSize;
    uniform float uPoint;
    uniform float uWeight;
    uniform float uSpread;
    uniform float uSway;

    varying vec2 vUv;

    vec3 rgbFromOklab(vec3 lab) {
        float l = lab.x + 0.3963377774 * lab.y + 0.2158037573 * lab.z;
        float m = lab.x - 0.1055613458 * lab.y - 0.0638541728 * lab.z;
        float s = lab.x - 0.0894841775 * lab.y - 1.291485548 * lab.z;
        l = l * l * l;
        m = m * m * m;
        s = s * s * s;
        return vec3(
            4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
            -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
            -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s
        );
    }

    float petalDist(vec2 q, float inner, float outer, float sector) {
        float t = clamp((q.x - inner) / max(outer - inner, 0.0001), 0.0, 1.0);

        float room = q.x * sin(sector * 0.5) * FULLNESS;

        float wide = (inner + outer) * 0.5 * sin(sector * 0.5) * FULLNESS;
        float taper = wide * pow(max(cos(PI * 0.5 * t), 0.0), uPoint);

        float d = abs(q.y) - min(room, taper);

        d = max(d, q.x - outer);
        return max(d, inner - q.x);
    }

    void main() {
        float aspect = uResolution.x / max(uResolution.y, 1.0);

        vec2 p = vec2(vUv.x * aspect, vUv.y);

        vec3 petalCol = rgbFromOklab(uPetal);
        vec3 lineCol = rgbFromOklab(uLine);
        vec3 heartCol = rgbFromOklab(uHeart);

        vec3 col = vec3(0.0);
        float cover = 0.0;

        float maxRank = max(ceil((uCount - 1.0) * 0.5), 1.0);

        for (int j = 0; j < MAX_FLOWERS; j++) {
            int i = MAX_FLOWERS - 1 - j;
            float fi = float(i);
            if (fi < uCount) {
                float rank = ceil(fi * 0.5);
                float side = mod(fi, 2.0) < 0.5 ? -1.0 : 1.0;

                for (int e = 0; e < 4; e++) {
                    if (uSides[e] > 0.5) {
                        float fe = float(e);
                        float seed = fract(sin((fi + fe * 13.0) * 37.13) * 43758.5453);

                        vec2 c, n, t;
                        float halfSpan;
                        if (e == 0) {
                            c = vec2(aspect * 0.5, 0.0);
                            n = vec2(0.0, 1.0);
                            t = vec2(1.0, 0.0);
                            halfSpan = aspect * 0.5;
                        } else if (e == 1) {
                            c = vec2(aspect * 0.5, 1.0);
                            n = vec2(0.0, -1.0);
                            t = vec2(1.0, 0.0);
                            halfSpan = aspect * 0.5;
                        } else if (e == 2) {
                            c = vec2(0.0, 0.5);
                            n = vec2(1.0, 0.0);
                            t = vec2(0.0, 1.0);
                            halfSpan = 0.5;
                        } else {
                            c = vec2(aspect, 0.5);
                            n = vec2(-1.0, 0.0);
                            t = vec2(0.0, 1.0);
                            halfSpan = 0.5;
                        }

                        float radius = uSize * pow(RANK_SHRINK, rank);

                        float along = side * rank * (uSpread * halfSpan / maxRank);

                        float into = radius * (0.55 - rank * RANK_SINK);

                        vec2 centre = c + t * along + n * into;

                        float tip = sin(uTime * (0.7 + seed * 0.7) + seed * TAU) * uSway;

                        vec2 q0 = p - centre;
                        float r0 = length(q0);
                        float a0 = atan(q0.y, q0.x) - tip;

                        float sector = TAU / uPetals;

                        float a = mod(a0 + sector * 0.5, sector) - sector * 0.5;
                        vec2 q = vec2(cos(a), sin(a)) * r0;

                        float d = petalDist(q, radius * 0.2, radius, sector);
                        float aa = max(fwidth(d), 0.0001);
                        float solid = 1.0 - smoothstep(-aa, aa, d);

                        float w = uWeight / uResolution.y;
                        float stroke = 1.0 - smoothstep(w - aa, w + aa, abs(d));

                        float dc = r0 - radius * 0.22;
                        float aac = max(fwidth(dc), 0.0001);
                        float eye = 1.0 - smoothstep(-aac, aac, dc);
                        float eyeLine = 1.0 - smoothstep(w - aac, w + aac, abs(dc));

                        col = mix(col, petalCol, solid);
                        col = mix(col, lineCol, stroke);
                        col = mix(col, heartCol, eye);
                        col = mix(col, lineCol, eyeLine);

                        cover = max(cover, max(max(solid, stroke), max(eye, eyeLine)));
                    }
                }
            }
        }

        if (cover < 0.004) discard;

        gl_FragColor = vec4(col * cover, cover);
    }
`

class BorderScene {
    private container: HTMLElement

    private renderer: THREE.WebGLRenderer
    private scene = new THREE.Scene()
    private camera = new THREE.Camera()
    private geometry = new THREE.PlaneGeometry(2, 2)
    private material: THREE.ShaderMaterial
    private mesh: THREE.Mesh

    private time = 0

    private frameId = 0
    private lastT = 0
    private disposed = false
    private running = false

    constructor(container: HTMLElement, cfg: Config) {
        this.container = container

        this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25))
        this.renderer.outputColorSpace = THREE.SRGBColorSpace
        this.renderer.setClearColor(0x000000, 0)
        const el = this.renderer.domElement
        el.style.position = "absolute"
        el.style.inset = "0"
        el.style.width = "100%"
        el.style.height = "100%"
        container.appendChild(el)

        this.material = new THREE.ShaderMaterial({
            vertexShader: QUAD_VERTEX,
            fragmentShader: BORDER_FRAGMENT,
            uniforms: {
                uResolution: { value: new THREE.Vector2(1, 1) },
                uTime: { value: 0 },
                uPetal: { value: new THREE.Vector3() },
                uLine: { value: new THREE.Vector3() },
                uHeart: { value: new THREE.Vector3() },
                uSides: { value: new THREE.Vector4(1, 1, 0, 0) },
                uCount: { value: 1 },
                uPetals: { value: 5 },
                uSize: { value: 0.1 },
                uPoint: { value: 1 },
                uWeight: { value: LINE_WEIGHT },
                uSpread: { value: 0 },
                uSway: { value: 0 },
            },
            transparent: true,
            depthTest: false,
            depthWrite: false,
        })

        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.frustumCulled = false
        this.scene.add(this.mesh)

        this.updateConfig(cfg)
    }

    start() {
        if (this.running) return
        this.running = true
        this.lastT = performance.now()
        const loop = () => {
            if (!this.running) return
            this.frameId = requestAnimationFrame(loop)
            this.step()
        }
        loop()
    }

    pause() {
        this.running = false
        cancelAnimationFrame(this.frameId)
    }

    resume() {
        this.start()
    }

    setSize(width: number, height: number) {
        if (this.disposed || width <= 0 || height <= 0) return
        this.renderer.setSize(width, height, false)
        const dpr = this.renderer.getPixelRatio()
        this.material.uniforms.uResolution.value.set(width * dpr, height * dpr)

        this.material.uniforms.uWeight.value = LINE_WEIGHT * dpr
    }

    updateConfig(cfg: Config) {
        if (this.disposed) return
        const S = settingsFor(cfg)
        const u = this.material.uniforms
        u.uPetal.value.copy(toOklab(cfg.petal, DEFAULTS.petal))
        u.uLine.value.copy(toOklab(cfg.line, DEFAULTS.line))
        u.uHeart.value.copy(toOklab(cfg.heart, DEFAULTS.heart))
        u.uSides.value.set(S.sides[0], S.sides[1], S.sides[2], S.sides[3])
        u.uCount.value = S.flowers
        u.uPetals.value = S.petals
        u.uSize.value = S.size
        u.uPoint.value = S.point
        u.uSpread.value = S.spread
        u.uSway.value = S.sway
    }

    private step() {
        if (this.disposed) return
        const now = performance.now()
        let dt = (now - this.lastT) / 1000
        this.lastT = now
        if (!isFinite(dt) || dt < 0) dt = 0

        if (dt > 0.05) dt = 0.05

        this.time += dt * 1.1
        this.material.uniforms.uTime.value = this.time

        this.renderer.render(this.scene, this.camera)
    }

    dispose() {
        this.disposed = true
        cancelAnimationFrame(this.frameId)
        const el = this.renderer.domElement
        this.geometry.dispose()
        this.material.dispose()
        this.renderer.dispose()
        if (el.parentNode === this.container) this.container.removeChild(el)
    }
}

export interface FlowerBorderProps {
    petal?: string
    line?: string
    heart?: string
    sides?: Sides
    flowers?: number
    petals?: number
    size?: number
    point?: number
    spread?: number
    sway?: number
    style?: React.CSSProperties
}

export default function FlowerBorder(props: FlowerBorderProps) {
    const {
        petal = DEFAULTS.petal,
        line = DEFAULTS.line,
        heart = DEFAULTS.heart,
        sides = { top: false, left: true, right: true, bottom: false },
        flowers = DEFAULTS.flowers,
        petals = DEFAULTS.petals,
        size = DEFAULTS.size,
        point = DEFAULTS.point,
        spread = DEFAULTS.spread,
        sway = DEFAULTS.sway,
        style,
    } = props

    const containerRef = useRef<HTMLDivElement | null>(null)
    const sceneRef = useRef<BorderScene | null>(null)

    const cfgRef = useRef<Config>(null as any)
    cfgRef.current = {
        petal,
        line,
        heart,
        sides,
        flowers,
        petals,
        size,
        point,
        spread,
        sway,
    }

    useEffect(() => {
        const container = containerRef.current
        if (!container) return
        let scene: BorderScene
        try {
            scene = new BorderScene(container, cfgRef.current)
        } catch {
            return
        }
        sceneRef.current = scene
        scene.setSize(container.clientWidth, container.clientHeight)

        // Only render when visible — avoids burning GPU while scrolled out of view
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    scene.resume()
                } else {
                    scene.pause()
                }
            },
            { threshold: 0.01 }
        )
        io.observe(container)

        const ro = new ResizeObserver(() => {
            scene.setSize(container.clientWidth, container.clientHeight)
        })
        ro.observe(container)
        return () => {
            io.disconnect()
            ro.disconnect()
            scene.dispose()
            sceneRef.current = null
        }
    }, [])

    useEffect(() => {
        sceneRef.current?.updateConfig(cfgRef.current)
    }, [
        petal,
        line,
        heart,
        sides?.top,
        sides?.bottom,
        sides?.left,
        sides?.right,
        flowers,
        petals,
        size,
        point,
        spread,
        sway,
    ])

    return (
        <div
            ref={containerRef}
            role="img"
            aria-label="Flowers fanned out along the edges of the frame"
            style={{
                position: "relative",
                width: "100%",
                height: "100%",

                minWidth: 1200,
                minHeight: 800,
                overflow: "hidden",
                ...style,
            }}
        />
    )
}

FlowerBorder.displayName = "Flower Border"
FlowerBorder.defaultProps = { ...DEFAULTS }