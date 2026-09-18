import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

/**
 * ReshaMandi: Geometric cocoon and silk-thread loom mark.
 */
export function ReshaMandiLogo({ className = "size-5", size = 20 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z"
        stroke="#F0977A"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeDasharray="1.5 3.5"
      />
      <path
        d="M8 8.5C8 7.11929 9.11929 6 10.5 6H13.5C14.8807 6 16 7.11929 16 8.5C16 9.88071 14.8807 11 13.5 11H8V18"
        stroke="#FAF7F0"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 11L16.5 18"
        stroke="#F0977A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="1.5" fill="#F0977A" />
    </svg>
  );
}

/**
 * Ultrahuman: Continuous infinity-loop / metabolic ring brand mark.
 */
export function UltrahumanLogo({ className = "size-5", size = 20 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <ellipse
        cx="9"
        cy="12"
        rx="5.5"
        ry="5"
        stroke="#FAF7F0"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <ellipse
        cx="15"
        cy="12"
        rx="5.5"
        ry="5"
        stroke="#F0977A"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="2" fill="#F0977A" fillOpacity="0.8" />
    </svg>
  );
}

/**
 * AI Coach: Ultrahuman metabolic intelligence with conversational spark.
 */
export function AiCoachLogo({ className = "size-5", size = 20 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.5" stroke="#FAF7F0" strokeWidth="1.5" strokeDasharray="3 2" />
      <path
        d="M12 5V8M12 16V19M5 12H8M16 12H19"
        stroke="#F0977A"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="3" fill="#F0977A" />
      <circle cx="12" cy="12" r="1.2" fill="#FAF7F0" />
    </svg>
  );
}

/**
 * AI Localization: Global linguistic translation & video audio waveform nodes.
 */
export function LocalizationLogo({ className = "size-5", size = 20 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="3.5"
        y="4.5"
        width="17"
        height="15"
        rx="3.5"
        stroke="#FAF7F0"
        strokeWidth="1.75"
      />
      <path
        d="M8 9H16M12 9V15M10 15H14"
        stroke="#F0977A"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="17.5" cy="7.5" r="1.5" fill="#F0977A" />
    </svg>
  );
}

/**
 * Performance Score: Three concentric biometric evaluation zones.
 */
export function PerformanceScoreLogo({ className = "size-5", size = 20 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="#9C9A95" strokeWidth="1.25" strokeOpacity="0.5" />
      <circle cx="12" cy="12" r="6" stroke="#FAF7F0" strokeWidth="1.75" strokeDasharray="6 3" />
      <circle cx="12" cy="12" r="3" stroke="#F0977A" strokeWidth="2" />
      <circle cx="12" cy="12" r="1.25" fill="#F0977A" />
    </svg>
  );
}

/**
 * Dipa Copilot: Luminous four-point neural compass.
 */
export function DipaCopilotLogo({ className = "size-5", size = 20 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"
        fill="url(#dipa-grad)"
      />
      <circle cx="12" cy="12" r="2" fill="#FAF7F0" />
      <defs>
        <linearGradient id="dipa-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F0977A" />
          <stop offset="1" stopColor="#D96B3D" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * All Work / Archive: Multi-system product catalog grid.
 */
export function AllWorkLogo({ className = "size-5", size = 20 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="4" y="4" width="6.5" height="6.5" rx="2" stroke="#F0977A" strokeWidth="1.75" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="2" stroke="#FAF7F0" strokeWidth="1.75" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="2" stroke="#FAF7F0" strokeWidth="1.75" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="2" stroke="#F0977A" strokeWidth="1.75" />
    </svg>
  );
}

export function getProjectLogo(slug: string) {
  switch (slug) {
    case "reshamandi":
      return <ReshaMandiLogo />;
    case "subscription":
      return <UltrahumanLogo />;
    case "ai-coach":
      return <AiCoachLogo />;
    case "ai-localization":
      return <LocalizationLogo />;
    case "performance-score":
      return <PerformanceScoreLogo />;
    case "behind-ai-copilot":
      return <DipaCopilotLogo />;
    default:
      return <AllWorkLogo />;
  }
}
