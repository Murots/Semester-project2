/**
 * Converts value to a more easy and readable date and time
 * @param {string} deadlineString
 * @returns {string}
 */
export function deadlineConverter(deadlineString) {
  const deadline = new Date(deadlineString);
  return deadline.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });
}
