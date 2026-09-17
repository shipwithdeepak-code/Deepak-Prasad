import React, { useEffect, useRef, useState } from "react";

interface PlasmaRingProps {
  className?: string;
  style?: React.CSSProperties;
  shouldReduceMotion?: boolean;
}

const vertexShader = `
  attribute vec2 a_position;
  void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`;

const fragmentShader = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_hover;
  const vec3 ivory = vec3(0.98, 0.96, 0.92);
  const vec3 peach = vec3(1.00, 0.67, 0.52);
  const vec3 coral = vec3(0.941, 0.592, 0.478);
  const vec3 amber = vec3(0.72, 0.28, 0.16);

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }
  float fbm(vec2 p) {
    float value = 0.0; float amplitude = 0.5;
    for (int i = 0; i < 5; i++) { value += noise(p) * amplitude; p = p * 2.03 + vec2(17.2, 9.1); amplitude *= 0.5; }
    return value;
  }
  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    float radius = length(uv); float angle = atan(uv.y, uv.x); float t = u_time * 0.72;
    if (radius > 0.62) discard;
    vec2 p = uv * 3.0;
    p += vec2(fbm(p + vec2(t * 0.34, -t * 0.21)), fbm(p + vec2(-t * 0.25, t * 0.31) + 4.7)) * 0.9;
    float fieldA = fbm(p * 1.35 + vec2(t * 0.16, -t * 0.13));
    float fieldB = fbm(p * 2.4 + vec2(-t * 0.22, t * 0.18));
    float field = clamp(fieldA * 0.72 + fieldB * 0.28, 0.0, 1.0);
    float filament = pow(max(0.0, sin(field * 18.0 + angle * 3.0 - t * 1.6) * 0.5 + 0.5), 3.0);
    float edge = smoothstep(0.62, 0.30, radius);
    float core = smoothstep(0.42, 0.02, radius);
    float body = smoothstep(0.63, 0.08, radius);
    vec3 color = mix(amber, coral, field);
    color = mix(color, peach, smoothstep(0.78, 0.35, field));
    color = mix(color, ivory, core * (0.65 + field * 0.35));
    color += peach * filament * 0.30 * edge;
    color *= 1.0 + u_hover * 0.16;
    float glow = exp(-radius * 4.0) * 0.24;
    float alpha = (body * (0.78 + field * 0.22) + glow) * edge;
    gl_FragColor = vec4(color * alpha, alpha);
  }
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source); gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader)); gl.deleteShader(shader); return null;
  }
  return shader;
}

export default function PlasmaRing({ className = "", style, shouldReduceMotion = false }: PlasmaRingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState(false);
  const hoverValue = useRef(0);

  useEffect(() => {
    const container = containerRef.current; const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const gl = canvas.getContext("webgl", { alpha: true, antialias: true, premultipliedAlpha: true, powerPreference: "high-performance" });
    if (!gl) return;
    const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexShader);
    const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
    if (!vertex || !fragment) return;
    const program = gl.createProgram(); if (!program) return;
    gl.attachShader(program, vertex); gl.attachShader(program, fragment); gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);
    const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const resolution = gl.getUniformLocation(program, "u_resolution");
    const time = gl.getUniformLocation(program, "u_time");
    const hover = gl.getUniformLocation(program, "u_hover");
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    let frame = 0; let destroyed = false; const started = performance.now();
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, container.clientWidth); const height = Math.max(1, container.clientHeight);
      const pixelWidth = Math.round(width * dpr); const pixelHeight = Math.round(height * dpr);
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth; canvas.height = pixelHeight; gl.viewport(0, 0, pixelWidth, pixelHeight);
      }
    };
    resize(); const observer = new ResizeObserver(resize); observer.observe(container);
    const render = () => {
      if (destroyed) return;
      const elapsed = (performance.now() - started) / 1000;
      hoverValue.current += ((hovered ? 1 : 0) - hoverValue.current) * 0.08;
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform1f(time, shouldReduceMotion ? elapsed * 0.12 : elapsed);
      gl.uniform1f(hover, hoverValue.current); gl.drawArrays(gl.TRIANGLES, 0, 6);
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);
    return () => { destroyed = true; cancelAnimationFrame(frame); observer.disconnect(); gl.deleteBuffer(buffer); gl.deleteProgram(program); gl.deleteShader(vertex); gl.deleteShader(fragment); };
  }, [shouldReduceMotion, hovered]);

  return (
    <div ref={containerRef} className={`relative shrink-0 ${className}`} style={{ width: "clamp(84px, 7.25vw, 104px)", height: "clamp(84px, 7.25vw, 104px)", overflow: "visible", background: "transparent", ...style }} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 block h-full w-full" style={{ background: "transparent" }} />
    </div>
  );
}
