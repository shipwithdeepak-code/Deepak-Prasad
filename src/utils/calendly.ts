export const CALENDLY_URL = "https://calendly.com/shipwithdeepak/chit-chat-with-deepak";

/**
 * Opens Deepak's Calendly scheduling page directly in a new tab.
 */
export function openCalendly(url: string = CALENDLY_URL): void {
  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}


