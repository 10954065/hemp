const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** Formats an ISO date (YYYY-MM-DD) as "31 October 2026". */
export function formatDate(isoDate: string): string {
  return dateFormatter.format(new Date(`${isoDate}T00:00:00Z`));
}
