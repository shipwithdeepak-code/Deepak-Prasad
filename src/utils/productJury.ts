/**
 * Configuration and constants for Product Jury.
 * Uses environment variable if supplied, otherwise defaults to the live product URL.
 */
export const PRODUCT_JURY_LIVE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_PRODUCT_JURY_URL) ||
  "https://productjury.ai";
