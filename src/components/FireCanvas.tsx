// ─── FireCanvas — Canvas particle fire system ─────────────────────────────────
import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  spawnAngle: number
}

// Color ramp: deep blue → sky → cyan → pale cyan → white
const RAMP = [
  [10,  40, 220, 0.0],   // deep blue (base, invisible)
  [14, 110, 235, 1.0],   // electric blue
  [6,  182, 212, 1.0],   // cyan
  [103, 232, 249, 0.9],  // light cyan
  [224, 247, 255, 0.7],  // near-white
  [255, 255, 255, 0.4],  // white tip
]

function lerpColor(t: number): [number, number, number, number] {
  const max = RAMP.length - 1
  const i   = Math.min(Math.floor(t * max), max - 1)
  const f   = t * max - i
  const a   = RAMP[i]
  const b   = RAMP[i + 1]
  return [
    a[0] + (b[0] - a[0]) * f,
    a[1] + (b[1] - a[1]) * f,
    a[2] + (b[2] - a[2]) * f,
    a[3] + (b[3] - a[3]) * f,
  ]
}

export default function FireCanvas({ photoRadius = 96 }: { photoRadius?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const MARGIN = 110
    const SIZE   = (photoRadius + MARGIN) * 2
    canvas.width  = SIZE
    canvas.height = SIZE
    const CX = SIZE / 2
    const CY = SIZE / 2

    const particles: Particle[] = []
    let raf  = 0
    let tick = 0

    function spawn() {
      const angle  = Math.random() * Math.PI * 2
      const jitter = Math.random() * 6 - 3
      const r      = photoRadius + jitter

      particles.push({
        x: CX + Math.cos(angle) * r,
        y: CY + Math.sin(angle) * r,
        // Outward radial speed + random swirl
        vx: Math.cos(angle) * (1.4 + Math.random() * 2.2) + (Math.random() - 0.5) * 1.0,
        vy: Math.sin(angle) * (1.4 + Math.random() * 2.2) + (Math.random() - 0.5) * 1.0,
        life: 0,
        maxLife: 45 + Math.random() * 55,
        size: 7 + Math.random() * 11,
        spawnAngle: angle,
      })
    }

    function frame() {
      tick++
      ctx.clearRect(0, 0, SIZE, SIZE)

      // Spawn 6–8 particles per frame for dense fire
      for (let n = 0; n < 7; n++) spawn()

      ctx.globalCompositeOperation = 'lighter'   // additive — gives natural glow overlap

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life++
        if (p.life >= p.maxLife) { particles.splice(i, 1); continue }

        // Organic turbulence — unique per spawn angle → different tendrils
        const noise =
          Math.sin(tick * 0.09 + p.spawnAngle * 5.1) * 0.14 +
          Math.cos(tick * 0.14 + p.spawnAngle * 2.7) * 0.09 +
          Math.sin(tick * 0.21 + p.spawnAngle * 8.3) * 0.05
        p.vx += noise
        p.vy += noise * 0.6

        // Drag
        p.vx *= 0.965
        p.vy *= 0.965

        p.x += p.vx
        p.y += p.vy

        const t       = p.life / p.maxLife
        const fadeIn  = Math.min(t / 0.12, 1)
        const fadeOut = 1 - Math.pow(Math.max((t - 0.35) / 0.65, 0), 0.6)
        const alpha   = fadeIn * fadeOut
        if (alpha <= 0.01) continue

        const [r, g, b, ca] = lerpColor(t)
        const size = p.size * (1 - t * 0.45)

        // Radial gradient → soft glowing particle
        const gr = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 1.6)
        gr.addColorStop(0,    `rgba(${r},${g},${b},${(alpha * ca).toFixed(3)})`)
        gr.addColorStop(0.35, `rgba(${r},${g},${b},${(alpha * ca * 0.55).toFixed(3)})`)
        gr.addColorStop(1,    `rgba(${r},${g},${b},0)`)

        ctx.beginPath()
        ctx.arc(p.x, p.y, size * 1.6, 0, Math.PI * 2)
        ctx.fillStyle = gr
        ctx.fill()
      }

      ctx.globalCompositeOperation = 'source-over'
      raf = requestAnimationFrame(frame)
    }

    frame()
    return () => cancelAnimationFrame(raf)
  }, [photoRadius])

  const dim = (photoRadius + 110) * 2

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: dim,
        height: dim,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  )
}
