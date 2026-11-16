import { useEffect, useRef } from "react";

type Ring = { n: number; off: number; L: number; w: number; a: number; k: number; p: number[] };
type Drop = { a: number; r: number; s: number; p: number };
type Cloud = { x: number; y: number; w: number; v: number; a: number };

export default function RosaAzul() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current!;
    const c = canvasRef.current!;
    const g = c.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const M = reduce ? 0.25 : 1;

    let W = 0, H = 0, S = 0;
    let px = 0.5, py = 0.5, tx = 0.5, ty = 0.5;
    let raf = 0;

    const fit = () => {
      const D = Math.min(window.devicePixelRatio || 1, 2);
      W = wrap.clientWidth;
      H = wrap.clientHeight;
      c.width = W * D;
      c.height = H * D;
      g.setTransform(D, 0, 0, D, 0, 0);
      S = Math.min(W, H) * 0.4;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(wrap);

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width;
      ty = (e.clientY - r.top) / r.height;
    };
    window.addEventListener("pointermove", onMove);

    // Capas de pétalos, de afuera hacia adentro
    const rings: Ring[] = [
      { n: 6, off: 0.1, L: 1.0, w: 0.6, a: 0 },
      { n: 6, off: 0.09, L: 0.88, w: 0.55, a: 0.52 },
      { n: 5, off: 0.08, L: 0.75, w: 0.5, a: 0.2 },
      { n: 5, off: 0.07, L: 0.62, w: 0.45, a: 0.9 },
      { n: 4, off: 0.06, L: 0.49, w: 0.4, a: 0.4 },
      { n: 4, off: 0.05, L: 0.37, w: 0.33, a: 1.1 },
      { n: 3, off: 0.03, L: 0.25, w: 0.25, a: 0.1 },
    ].map((r, i) => ({
      ...r,
      k: 1 - i / 6,
      p: Array.from({ length: r.n }, () => Math.random() * 6.28),
    }));

    const drops: Drop[] = Array.from({ length: 9 }, () => ({
      a: Math.random() * 6.28,
      r: 0.25 + Math.random() * 0.65,
      s: 1.5 + Math.random() * 2.5,
      p: Math.random() * 6.28,
    }));

    const clouds: Cloud[] = Array.from({ length: 7 }, () => ({
      x: Math.random(),
      y: 0.08 + Math.random() * 0.6,
      w: 0.25 + Math.random() * 0.3,
      v: 0.004 + Math.random() * 0.008,
      a: 0.12 + Math.random() * 0.16,
    }));

    const petal = (L: number, w: number, wv: number) => {
      g.beginPath();
      g.moveTo(0, 0);
      g.bezierCurveTo(L * 0.1, -w, L * 0.9, -w * (1.05 + wv), L, 0);
      g.bezierCurveTo(L * 0.9, w * (1.05 - wv), L * 0.1, w, 0, 0);
      g.closePath();
    };

    const drawBg = (t: number) => {
      g.clearRect(0, 0, W, H);

      const sky = g.createLinearGradient(0, 0, W, H);
      sky.addColorStop(0, "#c8ddff");
      sky.addColorStop(0.52, "#dce5ff");
      sky.addColorStop(1, "#f0dff2");
      g.fillStyle = sky;
      g.fillRect(0, 0, W, H);

      // Resplandor lavanda para acompañar los tonos azules de la rosa.
      const gl = g.createRadialGradient(W * 0.5, H * 0.82, 0, W * 0.5, H * 0.82, W * 0.6);
      gl.addColorStop(0, "rgba(175,160,255,.22)");
      gl.addColorStop(1, "rgba(175,160,255,0)");
      g.fillStyle = gl;
      g.fillRect(0, 0, W, H);

      // Nubes animadas
      for (const k of clouds) {
        const x = ((k.x + t * 0.001 * k.v * M) % 1.6) - 0.3;
        const cx = x * W, cy = k.y * H, rw = k.w * W;
        const cg = g.createRadialGradient(cx, cy, 0, cx, cy, rw);
        cg.addColorStop(0, `rgba(105,135,220,${k.a * 0.55})`);
        cg.addColorStop(1, "rgba(105,135,220,0)");
        g.save();
        g.translate(cx, cy);
        g.scale(1, 0.28);
        g.translate(-cx, -cy);
        g.fillStyle = cg;
        g.beginPath();
        g.arc(cx, cy, rw, 0, 7);
        g.fill();
        g.restore();
      }
    };

    const drawRose = (t: number) => {
      px += (tx - px) * 0.04;
      py += (ty - py) * 0.04;
      const s = t * 0.001 * M;
      const breathe = 1 + 0.018 * Math.sin(s * 1.1);

      g.save();
      g.translate(W / 2 + (px - 0.5) * S * 0.12, H * 0.46 + (py - 0.5) * S * 0.08);
      g.rotate(Math.sin(s * 0.35) * 0.05 + (px - 0.5) * 0.08);
      g.scale(breathe, breathe * (0.97 + (py - 0.5) * 0.03));

      // ⬇️ ANILLOS ORBITALES (ÁTOMOS) ⬇️
      for (let i = 0; i < 3; i++) {
        const angleOffset = s * 0.3 + i * 2.1;
        const radiusX = S * (1.1 + i * 0.2);
        const radiusY = S * (0.35 + i * 0.05);
        
        // Línea de la órbita
        g.beginPath();
        g.ellipse(0, 0, radiusX, radiusY, angleOffset, 0, Math.PI * 2);
        g.strokeStyle = `rgba(60, 140, 255, ${0.15 + i * 0.05})`; // Azul neón sutil
        g.lineWidth = 1.5;
        g.stroke();

        // Punto de luz viajando por la órbita
        const dotAngle = s * 1.5 + i * 2;
        const dotX = Math.cos(dotAngle) * radiusX;
        const dotY = Math.sin(dotAngle) * radiusY;
        
        // Rotar coordenadas del punto
        const rX = dotX * Math.cos(angleOffset) - dotY * Math.sin(angleOffset);
        const rY = dotX * Math.sin(angleOffset) + dotY * Math.cos(angleOffset);

        // Resplandor del átomo
        const dotGlow = g.createRadialGradient(rX, rY, 0, rX, rY, 6);
        dotGlow.addColorStop(0, "rgba(150, 220, 255, 1)");
        dotGlow.addColorStop(1, "rgba(150, 220, 255, 0)");
        g.fillStyle = dotGlow;
        g.beginPath();
        g.arc(rX, rY, 8, 0, 7);
        g.fill();

        // Núcleo brillante del átomo
        g.fillStyle = "#ffffff";
        g.beginPath();
        g.arc(rX, rY, 2, 0, 7);
        g.fill();
      }
      // ⬆️ FIN DE ANILLOS ORBITALES ⬆️

      // Resplandor azul de fondo
      const halo = g.createRadialGradient(0, 0, S * 0.2, 0, 0, S * 1.25);
      halo.addColorStop(0, "rgba(40,70,255,.35)");
      halo.addColorStop(1, "rgba(40,70,255,0)");
      g.fillStyle = halo;
      g.beginPath();
      g.arc(0, 0, S * 1.25, 0, 7);
      g.fill();

      rings.forEach((r, i) => {
        const dir = i % 2 ? 1 : -1;
        for (let j = 0; j < r.n; j++) {
          const ph = r.p[j];
          const ang =
            r.a + (j * 6.2832) / r.n +
            Math.sin(s * 0.5) * 0.06 * dir * (1 - r.k * 0.4) +
            Math.sin(s * 0.9 + ph) * 0.05;
          const L = r.L * S * (1 + 0.035 * Math.sin(s * 1.3 + ph));
          const w = r.w * S;
          const wv = 0.12 * Math.sin(s * 1.1 + ph * 1.7);

          g.save();
          g.rotate(ang);
          g.translate(r.off * S, 0);

          const gr = g.createLinearGradient(0, 0, L, 0);
          gr.addColorStop(0, "hsl(236 92% 7%)");
          gr.addColorStop(0.5, `hsl(229 88% ${18 + r.k * 16}%)`);
          gr.addColorStop(1, `hsl(222 92% ${36 + r.k * 24}%)`);
          petal(L, w, wv);
          g.fillStyle = gr;
          g.fill();
          g.lineWidth = 1.5;
          g.strokeStyle = "rgba(2,4,40,.65)";
          g.stroke();

          // Brillo en el borde
          g.beginPath();
          g.moveTo(L * 0.55, -w * 0.78);
          g.bezierCurveTo(L * 0.8, -w * 0.9, L * 0.97, -w * 0.45, L * 0.99, -w * 0.05);
          g.strokeStyle = `rgba(150,175,255,${0.18 + 0.14 * Math.sin(s * 0.8 + ph)})`;
          g.lineWidth = 2.2;
          g.stroke();
          g.restore();
        }
      });

      // Corazón oscuro
      const ct = g.createRadialGradient(0, 0, 0, 0, 0, S * 0.12);
      ct.addColorStop(0, "rgba(0,0,15,.95)");
      ct.addColorStop(1, "rgba(0,0,40,0)");
      g.fillStyle = ct;
      g.beginPath();
      g.arc(0, 0, S * 0.12, 0, 7);
      g.fill();

      // Gotas de rocío
      for (const d of drops) {
        const x = Math.cos(d.a) * d.r * S;
        const y = Math.sin(d.a) * d.r * S;
        const tw = 0.45 + 0.55 * Math.max(0, Math.sin(s * 1.6 + d.p));
        g.fillStyle = `rgba(190,210,255,${0.25 + 0.3 * tw})`;
        g.beginPath();
        g.arc(x, y, d.s, 0, 7);
        g.fill();
        g.fillStyle = `rgba(255,255,255,${0.4 + 0.6 * tw})`;
        g.beginPath();
        g.arc(x - d.s * 0.3, y - d.s * 0.3, d.s * 0.38, 0, 7);
        g.fill();
      }

      // Luz que recorre la flor
      const lx = Math.cos(s * 0.4) * S * 0.5;
      const ly = -S * 0.4 + Math.sin(s * 0.4) * S * 0.15;
      const lg = g.createRadialGradient(lx, ly, 0, lx, ly, S * 0.9);
      lg.addColorStop(0, "rgba(140,170,255,.22)");
      lg.addColorStop(1, "rgba(140,170,255,0)");
      g.globalCompositeOperation = "lighter";
      g.fillStyle = lg;
      g.beginPath();
      g.arc(0, 0, S * 1.05, 0, 7);
      g.fill();
      g.globalCompositeOperation = "source-over";
      g.restore();
    };

    const frame = (t: number) => {
      drawBg(t);
      drawRose(t);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        // ⬇️ NUEVO FONDO NOCTURNO ESTILO SCI-FI ⬇️
        background: "transparent",
      }}
    >
      <canvas
        ref={canvasRef}
        aria-label="Rosa azul interactiva con anillos orbitales y cielo nocturno"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}