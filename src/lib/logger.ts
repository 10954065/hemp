/**
 * Minimal structured server logger. Never pass personal data (names, emails, messages);
 * log only event names and non-identifying detail such as categories and status codes.
 */
export function logEvent(event: string, detail: Record<string, string | number> = {}): void {
  const isWarning = event.includes("failed") || event.includes("rejected");
  const line = JSON.stringify({ level: isWarning ? "warn" : "info", event, ...detail, at: new Date().toISOString() });
  if (isWarning) {
    console.warn(line);
    return;
  }
  console.info(line);
}
