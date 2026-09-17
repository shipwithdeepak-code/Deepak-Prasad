import React, { useEffect, useRef, useState } from "react";

interface PlasmaRingProps {
  className?: string;
  style?: React.CSSProperties;
  shouldReduceMotion?: boolean;
}

export default function PlasmaRing({
  className = "",
  style,
  shouldReduceMotion = false,
}: PlasmaRingProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const hoverRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let isDestroyed = false;
    let animId: number;
    let startTime = performance.now();

    // Check for WebGL support
    let gl: WebGLRenderingContext | null = null;
    try {
      gl = (canvas.getContext("webgl", {
        alpha: true,
        antialias: true,
        premultipliedAlpha: true,
        powerPreference: "high-performance",
      }) ||
        canvas.getContext("experimental-webgl", {
          alpha: true,
          antialias: true,
        })) as WebGLRenderingContext | null;
    } catch {
      gl = null;
    }

    if (gl) {
      // -------------------------------------------------------------
      // High-Performance WebGL Fluid Plasma Living Energy Sphere
      // -------------------------------------------------------------
      const vsSource = `
        attribute vec2 a_pos;
        void main() {
          gl_Position = vec4(a_pos, 0.0, 1.0);
        }
      `;

      const fsSource = `
        precision highp float;
        uniform vec2 u_res;
        uniform float u_time;
        uniform float u_hover;

        // Deepak Portfolio Palette
        const vec3 colCore  = vec3(0.99, 0.97, 0.94); // Warm Ivory #FAF6F0
        const vec3 colPeach = vec3(1.00, 0.72, 0.58); // Soft Peach #FFAA88
        const vec3 colCoral = vec3(0.941, 0.592, 0.478); // Signature Warm Coral #F0977A
        const vec3 colAmber = vec3(0.85, 0.42, 0.24); // Rich Amber-Coral #D96B3D
        const vec3 colDeep  = vec3(0.18, 0.10, 0.08); // Deep warm obsidian

        vec2 hash2(vec2 p) {
          p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
          return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
                dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
            mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
                dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
            u.y
          );
        }

        mat2 rot1 = mat2(0.80, 0.60, -0.60, 0.80);
        mat2 rot2 = mat2(0.86, -0.50, 0.50, 0.86);

        float fbm(vec2 p) {
          float v = 0.0;
          float a = 0.5;
          v += a * noise(p); p = rot1 * p * 2.02 + vec2(0.12, 0.17); a *= 0.5;
          v += a * noise(p); p = rot2 * p * 2.04 + vec2(0.24, 0.31); a *= 0.5;
          v += a * noise(p); p = rot1 * p * 2.01 + vec2(0.15, 0.28); a *= 0.5;
          v += a * noise(p);
          return v;
        }

        void main() {
          // Normalized coordinates: center at (0, 0), radius 1.0 maps to edge
          vec2 uv = (gl_FragCoord.xy - 0.5 * u_res.xy) / (0.5 * min(u_res.x, u_res.y));
          float r = length(uv);
          if (r > 1.25) {
            discard;
          }

          float t = u_time * 0.85;
          float angle = atan(uv.y, uv.x);

          // Liquid vortex rotation
          float swirlAngle = angle + sin(r * 3.14159 - t * 0.8) * 0.75 + cos(uv.x * 2.0 + t * 0.5) * 0.3;
          vec2 rotatedUV = vec2(cos(swirlAngle), sin(swirlAngle)) * r;

          // Multi-octave domain warping for continuous fluid turbulence
          vec2 q = vec2(
            fbm(rotatedUV * 2.4 + vec2(t * 0.32, -t * 0.22)),
            fbm(rotatedUV * 2.4 + vec2(-t * 0.28, t * 0.35) + vec2(5.2, 1.3))
          );

          vec2 p2 = rotatedUV * 2.8 + q * 1.5;
          float f1 = fbm(p2 + vec2(t * 0.20, -t * 0.16));
          float f2 = fbm(p2 * 1.7 + vec2(-t * 0.25, t * 0.30) + q);
          float plasmaField = clamp(0.5 + 0.5 * (f1 * 0.7 + f2 * 0.3), 0.0, 1.0);

          // Soft breathing pulsation (living energy sphere)
          float breath = 0.93 + 0.07 * sin(t * 1.6);
          float coreR = r / breath;

          // Organic perimeter liquid undulation — prevents any rigid circular outline
          float edgeWobble = (fbm(vec2(angle * 2.2, t * 0.5)) - 0.5) * 0.09;
          float organicR = coreR + edgeWobble;

          // Color zone blending (center -> edge)
          float wCore = clamp((0.35 - organicR) / 0.35, 0.0, 1.0);
          wCore = wCore * wCore * (3.0 - 2.0 * wCore);

          float wPeach = clamp((0.68 - organicR) / 0.40, 0.0, 1.0);
          wPeach = wPeach * wPeach * (3.0 - 2.0 * wPeach);

          float wCoral = clamp((0.95 - organicR) / 0.45, 0.0, 1.0);
          wCoral = wCoral * wCoral * (3.0 - 2.0 * wCoral);

          // Internal fluid filaments
          float filament = pow(max(0.0, sin(f1 * 6.28318 + t * 1.2) * 0.5 + 0.5), 2.5);

          vec3 col = mix(colDeep, colAmber, wCoral);
          col = mix(col, colCoral, wCoral * (0.6 + 0.4 * plasmaField));
          col = mix(col, colPeach, wPeach * (0.7 + 0.3 * plasmaField));
          col = mix(col, colCore, wCore * (0.85 + 0.15 * plasmaField));
          col += colPeach * filament * 0.35 * clamp((0.85 - organicR) / 0.85, 0.0, 1.0);

          // Smooth edge falloff to zero (no ring border)
          float alpha = clamp((1.0 - organicR) / 0.22, 0.0, 1.0);
          alpha = alpha * alpha * (3.0 - 2.0 * alpha);

          // Soft irregular atmospheric glow extending slightly beyond boundary
          float glow = exp(-r * 3.4) * 0.42;
          col += colCoral * glow * 0.6;
          alpha = clamp(alpha + glow * 0.8, 0.0, 1.0);

          // Hover energy boost
          col *= (1.0 + u_hover * 0.18);
          alpha = min(1.0, alpha * (1.0 + u_hover * 0.10));

          gl_FragColor = vec4(col * alpha, alpha);
        }
      `;

      function createShader(glCtx: WebGLRenderingContext, type: number, source: string) {
        const shader = glCtx.createShader(type);
        if (!shader) return null;
        glCtx.shaderSource(shader, source);
        glCtx.compileShader(shader);
        if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
          console.error(glCtx.getShaderInfoLog(shader));
          glCtx.deleteShader(shader);
          return null;
        }
        return shader;
      }

      const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
      const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

      if (vs && fs) {
        const program = gl.createProgram();
        if (program) {
          gl.attachShader(program, vs);
          gl.attachShader(program, fs);
          gl.linkProgram(program);

          if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
            gl.useProgram(program);

            const buf = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buf);
            gl.bufferData(
              gl.ARRAY_BUFFER,
              new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
              gl.STATIC_DRAW
            );

            const aPos = gl.getAttribLocation(program, "a_pos");
            gl.enableVertexAttribArray(aPos);
            gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

            const uRes = gl.getUniformLocation(program, "u_res");
            const uTime = gl.getUniformLocation(program, "u_time");
            const uHover = gl.getUniformLocation(program, "u_hover");

            gl.enable(gl.BLEND);
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

            const resize = () => {
              if (!canvas || !container) return;
              const dpr = Math.min(window.devicePixelRatio || 1, 2);
              const w = container.clientWidth || 72;
              const h = container.clientHeight || 72;
              const pw = Math.round(w * dpr);
              const ph = Math.round(h * dpr);
              if (canvas.width !== pw || canvas.height !== ph) {
                canvas.width = pw;
                canvas.height = ph;
                gl.viewport(0, 0, pw, ph);
              }
            };

            resize();
            const ro = new ResizeObserver(resize);
            ro.observe(container);

            const render = () => {
              if (isDestroyed) return;
              const now = performance.now();
              const elapsed = (now - startTime) / 1000;
              const timeVal = shouldReduceMotion ? elapsed * 0.15 : elapsed;

              const targetHover = isHovered ? 1.0 : 0.0;
              hoverRef.current += (targetHover - hoverRef.current) * 0.12;

              gl.clearColor(0, 0, 0, 0);
              gl.clear(gl.COLOR_BUFFER_BIT);

              gl.uniform2f(uRes, canvas.width, canvas.height);
              gl.uniform1f(uTime, timeVal);
              gl.uniform1f(uHover, hoverRef.current);

              gl.drawArrays(gl.TRIANGLES, 0, 6);

              animId = requestAnimationFrame(render);
            };

            animId = requestAnimationFrame(render);

            return () => {
              isDestroyed = true;
              cancelAnimationFrame(animId);
              ro.disconnect();
              gl.deleteProgram(program);
              gl.deleteShader(vs);
              gl.deleteShader(fs);
              gl.deleteBuffer(buf);
            };
          }
        }
      }
    }

    // -------------------------------------------------------------
    // Failsafe 2D Fluid Simulation Fallback (runs if WebGL unavailable)
    // -------------------------------------------------------------
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;

    const resize2d = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = container.clientWidth || 72;
      const h = container.clientHeight || 72;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    };

    resize2d();
    const ro2d = new ResizeObserver(resize2d);
    ro2d.observe(container);

    const render2d = () => {
      if (isDestroyed) return;
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;
      const t = shouldReduceMotion ? elapsed * 0.15 : elapsed * 0.9;

      const w = canvas.width;
      const h = canvas.height;
      ctx2d.clearRect(0, 0, w, h);

      const cx = w * 0.5;
      const cy = h * 0.5;
      const radius = Math.min(cx, cy) * 0.88;

      const breath = 1.0 + 0.05 * Math.sin(t * 1.7);
      const currentRadius = radius * breath;

      // Soft atmospheric glow
      const glowGrad = ctx2d.createRadialGradient(cx, cy, 0, cx, cy, currentRadius * 1.15);
      glowGrad.addColorStop(0, "rgba(240, 151, 122, 0.45)");
      glowGrad.addColorStop(0.5, "rgba(224, 122, 95, 0.25)");
      glowGrad.addColorStop(1, "rgba(240, 151, 122, 0)");
      ctx2d.fillStyle = glowGrad;
      ctx2d.beginPath();
      ctx2d.arc(cx, cy, currentRadius * 1.15, 0, Math.PI * 2);
      ctx2d.fill();

      // Swirling fluid body
      const numSwirls = 4;
      for (let i = 0; i < numSwirls; i++) {
        const angle = t * 0.6 + (i * Math.PI * 2) / numSwirls;
        const offX = Math.cos(angle) * (currentRadius * 0.25);
        const offY = Math.sin(angle) * (currentRadius * 0.25);
        const grad = ctx2d.createRadialGradient(
          cx + offX,
          cy + offY,
          0,
          cx,
          cy,
          currentRadius * 0.85
        );
        grad.addColorStop(0, i % 2 === 0 ? "rgba(255, 170, 136, 0.7)" : "rgba(240, 151, 122, 0.6)");
        grad.addColorStop(0.6, "rgba(217, 107, 61, 0.4)");
        grad.addColorStop(1, "rgba(28, 19, 16, 0)");
        ctx2d.fillStyle = grad;
        ctx2d.beginPath();
        ctx2d.arc(cx, cy, currentRadius * 0.9, 0, Math.PI * 2);
        ctx2d.fill();
      }

      // Luminous warm ivory core
      const corePulse = 1.0 + 0.08 * Math.sin(t * 2.2);
      const coreGrad = ctx2d.createRadialGradient(
        cx + Math.cos(t * 1.2) * 2,
        cy + Math.sin(t * 1.2) * 2,
        0,
        cx,
        cy,
        currentRadius * 0.38 * corePulse
      );
      coreGrad.addColorStop(0, "rgba(255, 250, 245, 0.95)");
      coreGrad.addColorStop(0.35, "rgba(255, 170, 136, 0.8)");
      coreGrad.addColorStop(0.7, "rgba(240, 151, 122, 0.3)");
      coreGrad.addColorStop(1, "rgba(240, 151, 122, 0)");
      ctx2d.fillStyle = coreGrad;
      ctx2d.beginPath();
      ctx2d.arc(cx, cy, currentRadius * 0.45, 0, Math.PI * 2);
      ctx2d.fill();

      animId = requestAnimationFrame(render2d);
    };

    animId = requestAnimationFrame(render2d);

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animId);
      ro2d.disconnect();
    };
  }, [shouldReduceMotion, isHovered]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full h-full flex items-center justify-center select-none pointer-events-none ${className}`}
      style={{
        background: "transparent",
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{
          background: "transparent",
        }}
      />
    </div>
  );
}
