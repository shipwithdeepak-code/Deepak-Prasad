import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Fluted glass, in the hero's two colours.
 *
 * Adapted from the 21st.dev Shader Builder "Fluted Glass" preset, which is
 * itself derived from Paper Shaders (Apache-2.0):
 * https://shaders.paper.design/fluted-glass
 *
 * Three things were changed from the preset for this site.
 *
 * The palette is four stops of the hero artwork colours from DESIGN.md:
 * coral, cobalt, deep space and electric sky. That file reserves these for
 * the hero composition and nothing else, and it says the hero is the one
 * place the system is allowed to break its own rules. The grey ramp this
 * started from was faithful to the rest of the page and made the top of the
 * site read as switched off.
 *
 * Time runs at an eighth of the preset's speed. At the original rate the
 * flutes read as a screensaver behind the headline; this slow it reads as a
 * surface that happens to be alive.
 *
 * Of the preset's four pointer effects, only the push survives. Fluted glass
 * refracts, so moving past it shifts what sits behind: a global drift of the
 * field toward the cursor is the one that reads as the material behaving
 * rather than as a trick. Swirl and ripple both pull the eye off the headline.
 * The drift is lerped so it trails the pointer and has some weight, and it
 * fades out when the pointer leaves the hero.
 */

const VERT = `attribute vec2 a_position;
void main(){ gl_Position = vec4(a_position, 0.0, 1.0); }`;

const FRAG = `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec3 u_colors[4];
uniform vec4 u_scene;      // resolution.xy, time, colour count
uniform vec4 u_shape;      // scale, intensity, flutes, warp
uniform vec4 u_surface;    // detail, contrast, brightness, saturation
uniform vec4 u_finish;     // seed, vignette, blur, grain
uniform vec4 u_cursor;     // pointer.xy (-1..1), presence, strength
uniform float u_rotate;

#define u_resolution u_scene.xy
#define u_time u_scene.z
#define u_colorCount u_scene.w
#define u_scale u_shape.x
#define u_intensity u_shape.y
#define u_paramA u_shape.z
#define u_warp u_shape.w
#define u_detail u_surface.x
#define u_contrast u_surface.y
#define u_brightness u_surface.z
#define u_saturation u_surface.w
#define u_seed u_finish.x
#define u_vignette u_finish.y
#define u_blur u_finish.z
#define u_grain u_finish.w
#define u_mouse u_cursor.xy
#define u_presence u_cursor.z
#define u_cursorStrength u_cursor.w

float hash21(vec2 p){
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

// Even, unstructured noise for the grain. The multiply hash above is fine for
// value noise but shows a faint axis-aligned mesh on flat areas, which reads
// as a net rather than film grain.
float grainHash(vec2 p){
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p){
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
             mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p){
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(17.0, 9.2);
    a *= 0.5;
  }
  return v;
}

// WebGL1 forbids dynamic indexing of a uniform array in a fragment shader,
// hence the constant loop bound.
vec3 palette(float x){
  float n = max(u_colorCount - 1.0, 1.0);
  float f = clamp(x, 0.0, 1.0) * n;
  vec3 col = u_colors[0];
  for (int i = 0; i < 3; i++) {
    if (float(i) < n) {
      col = mix(col, u_colors[i + 1], smoothstep(0.0, 1.0, clamp(f - float(i), 0.0, 1.0)));
    }
  }
  return col;
}

vec3 shade(vec2 p, float t){
  float flutes = mix(42.0, 7.0, u_paramA);
  float cell = fract((p.x + 1.0) * flutes) - 0.5;
  float prism = sin(cell * 3.1415926) * (0.03 + u_intensity * 0.2);
  vec2 sp = p + vec2(prism, sin(p.x * flutes + t * 0.2) * prism * 0.35);
  float field = fbm(sp * 2.2 + vec2(t * 0.035, -t * 0.025) + u_seed);
  field += 0.24 * sin(sp.y * 3.0 + sp.x * 1.3);
  float hi = pow(1.0 - abs(cell) * 2.0, mix(12.0, 2.0, u_intensity));
  float sh = smoothstep(0.18, 0.5, abs(cell));
  vec3 glass = palette(clamp(field + hi * 0.3, 0.0, 1.0));
  return glass * (0.72 + hi * 0.42 - sh * 0.12);
}

void main(){
  vec2 screenUv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

  // Refraction. The whole field drifts toward the pointer, the way the view
  // through fluted glass shifts as you move past it. Applied before the scale
  // and rotation so it stays in screen space and reads the same everywhere.
  if (u_presence > 0.001) {
    vec2 cursor = (0.5 * u_mouse * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    p += cursor * u_presence * u_cursorStrength * 0.55;
  }

  p *= u_scale;

  if (abs(u_rotate) > 0.0001) {
    float cr = cos(u_rotate), sr = sin(u_rotate);
    p = mat2(cr, -sr, sr, cr) * p;
  }
  if (u_warp > 0.0) {
    p += u_warp * (vec2(fbm(p * u_detail + u_seed),
                        fbm(p * u_detail + vec2(5.2, 1.3))) - 0.5);
  }

  vec3 col;
  if (u_blur > 0.0) {
    float pe = u_blur * u_scale;
    col  = shade(p, u_time) * 0.36;
    col += shade(p + vec2(pe, 0.0), u_time) * 0.16;
    col += shade(p - vec2(pe, 0.0), u_time) * 0.16;
    col += shade(p + vec2(0.0, pe), u_time) * 0.16;
    col += shade(p - vec2(0.0, pe), u_time) * 0.16;
  } else {
    col = shade(p, u_time);
  }

  if (abs(u_contrast - 1.0) > 0.0001) col = (col - 0.5) * u_contrast + 0.5;
  // saturation 0 collapses to luminance: greyscale by construction.
  if (abs(u_saturation - 1.0) > 0.0001) {
    float l = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(vec3(l), col, u_saturation);
  }
  if (abs(u_brightness) > 0.0001) col += u_brightness;
  if (u_vignette > 0.0001) {
    float vd = length(screenUv - 0.5) * 1.41421356;
    col *= 1.0 - u_vignette * smoothstep(0.35, 1.0, vd);
  }
  if (u_grain > 0.0001) {
    col += (grainHash(gl_FragCoord.xy + vec2(u_seed * 17.0, u_seed * 31.0)) - 0.5) * u_grain;
  }
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`;

// Theme palettes: dark portfolio theme (warm obsidian, warm charcoal, restrained coral)
// and light studio theme.
const DARK_THEME_COLORS = [
  [0.039, 0.039, 0.043], // obsidian base #0A0A0B
  [0.094, 0.094, 0.106], // warm charcoal #18181B
  [0.063, 0.063, 0.071], // graphite      #101012
  [0.941, 0.592, 0.478], // restrained coral #F0977A
];

const LIGHT_THEME_COLORS = [
  [1.0, 1.0, 1.0],       // pure white
  [0.94, 0.94, 0.94],    // light gray
  [0.88, 0.88, 0.92],    // subtle cool tint
  [0.941, 0.592, 0.478], // restrained coral
];

const CONFIG = {
  colors: DARK_THEME_COLORS,
  colorCount: 4,
  scale: 2.1,
  intensity: 0.36,
  flutes: 0.28,
  warp: 0.06,
  detail: 2.2,
  contrast: 0.98,
  brightness: -0.04,
  saturation: 0.65,
  seed: 1,
  vignette: 0.32,
  blur: 0.0015,
  grain: 0.065,
  rotate: 1.9373,
  /** Slow, subtle organic refraction that follows the cursor declaration */
  timeScale: 0.14,
  cursorStrength: 0.38,
};

/** Above this the canvas stops gaining detail and starts costing fill rate. */
const PIXEL_BUDGET = 2_000_000;

export default function ShaderBackground({
  className,
  theme = "dark",
}: {
  className?: string;
  theme?: "dark" | "light";
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: false });
    if (!gl) return; // no context: the hero keeps its portrait and gradients

    const activeColors = theme === "light" ? LIGHT_THEME_COLORS : DARK_THEME_COLORS;

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    };

    const program = gl.createProgram()!;
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    gl.useProgram(program);

    // One full-screen triangle. Cheaper than two and has no seam.
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const at = (name: string) => gl.getUniformLocation(program, name);
    gl.uniform3fv(at("u_colors"), new Float32Array(activeColors.flat()));
    gl.uniform4f(at("u_shape"), CONFIG.scale, CONFIG.intensity, CONFIG.flutes, CONFIG.warp);
    gl.uniform4f(at("u_surface"), CONFIG.detail, CONFIG.contrast, CONFIG.brightness, CONFIG.saturation);
    gl.uniform4f(at("u_finish"), CONFIG.seed, CONFIG.vignette, CONFIG.blur, CONFIG.grain);
    gl.uniform1f(at("u_rotate"), CONFIG.rotate);
    const scene = at("u_scene");
    const cursor = at("u_cursor");

    const start = performance.now();
    let frame = 0;
    let onScreen = true;
    let disposed = false;

    // Pointer state. Targets are set by the listener, the eased values are
    // advanced in the draw loop, so a fast mouse cannot outrun the frame rate.
    let rect = canvas.getBoundingClientRect();
    let targetX = 0;
    let targetY = 0;
    let targetPresence = 0;
    let mouseX = 0;
    let mouseY = 0;
    let presence = 0;
    let last: number | null = null;

    const resize = () => {
      rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      let width = Math.max(1, Math.round(rect.width * dpr));
      let height = Math.max(1, Math.round(rect.height * dpr));
      const budget = Math.min(1, Math.sqrt(PIXEL_BUDGET / Math.max(1, width * height)));
      width = Math.max(1, Math.round(width * budget));
      height = Math.max(1, Math.round(height * budget));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const draw = (now: number) => {
      frame = 0;
      if (disposed) return;
      resize();

      // Frame-rate independent easing, so the drift feels the same at 60 and
      // at 120Hz. The first frame has no delta, so it snaps to rest.
      const dt = last === null ? 0 : Math.min((now - last) / 1000, 0.1);
      last = now;
      const follow = 1 - Math.exp(-9 * dt);
      mouseX += (targetX - mouseX) * follow;
      mouseY += (targetY - mouseY) * follow;
      presence += (targetPresence - presence) * follow;

      gl.uniform4f(
        scene,
        canvas.width,
        canvas.height,
        ((now - start) / 1000) * CONFIG.timeScale,
        CONFIG.colorCount,
      );
      gl.uniform4f(cursor, mouseX, mouseY, presence, CONFIG.cursorStrength);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // Reduced motion still gets the texture, just never a second frame.
      if (!reduceMotion && onScreen && document.visibilityState === "visible") {
        frame = requestAnimationFrame(draw);
      }
    };

    const wake = () => {
      if (!disposed && !frame && onScreen && document.visibilityState === "visible") {
        frame = requestAnimationFrame(draw);
      }
    };
    const sleep = () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const observer = new IntersectionObserver((entries) => {
      onScreen = entries[0]?.isIntersecting ?? true;
      if (onScreen) wake();
      else sleep();
    });
    observer.observe(canvas);

    // Mouse only. A touch pointer has no hover, and tracking it here would
    // fight the scroll it is actually doing.
    const onPointerMove = (event: PointerEvent) => {
      if (reduceMotion || event.pointerType !== "mouse") return;
      if (rect.width === 0 || rect.height === 0) return;
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      if (!inside) {
        targetPresence = 0;
        return;
      }
      targetX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      targetY = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      targetPresence = 1;
      wake();
    };
    const onPointerOut = () => {
      targetPresence = 0;
      wake();
    };

    const onVisibility = () => (document.visibilityState === "visible" ? wake() : sleep());
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", wake);
    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("blur", onPointerOut);
      document.documentElement.addEventListener("pointerleave", onPointerOut);
    }

    // Always paint once, so the texture is present even when motion is reduced.
    frame = requestAnimationFrame(draw);

    return () => {
      disposed = true;
      sleep();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", wake);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", onPointerOut);
      document.documentElement.removeEventListener("pointerleave", onPointerOut);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [reduceMotion]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
