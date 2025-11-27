/**
 * Formats a Date object into a string (e.g., "November 27, 2025").
 * @param date The date to format.
 * @returns The formatted date string.
 */
export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}
