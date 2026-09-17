import React from "react";
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from "shaders/react";

interface HeroShaderProps {
  className?: string;
}

/**
 * Technical reference: "Glass Agency Hero" shader specification.
 * Layer order (mandatory):
 * 1. Swirl
 * 2. ChromaFlow (declarative cursor bloom with momentum)
 * 3. FlutedGlass (refractive fluted glass with chromatic fringing)
 * 4. FilmGrain (whisper of analog texture)
 *
 * Theme adaptation:
 * Dark portfolio aesthetic (obsidian #0A0A0B base, warm charcoal, restrained warm coral, subtle ivory).
 * Zero bright agency white, zero blue/cyan, zero neon colors.
 */
export default function HeroShader({ className = "" }: HeroShaderProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <Shader
        className="size-full block"
        style={{ width: "100%", height: "100%", display: "block" }}
        disableTelemetry={true}
      >
        <Swirl
          colorA="#0A0A0B"
          colorB="#141416"
          detail={1.7}
          speed={0.12}
        />
        <ChromaFlow
          baseColor="#0A0A0B"
          downColor="#F0977A"
          leftColor="#27272A"
          rightColor="#E07A5F"
          upColor="#EDE8E1"
          momentum={13}
          radius={3.5}
        />
        <FlutedGlass
          aberration={0.35}
          angle={31}
          frequency={8}
          highlight={0.08}
          highlightSoftness={0}
          lightAngle={-90}
          refraction={3.5}
          shape="rounded"
          softness={1}
          speed={0.15}
        />
        <FilmGrain
          strength={0.05}
        />
      </Shader>
    </div>
  );
}
