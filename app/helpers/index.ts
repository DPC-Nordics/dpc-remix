export function formatDateTime(timestamp: number, prefix: string = "") {
  if (timestamp === undefined) return "";

  const formatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
    timeStyle: "short",
  });

  return prefix + formatter.format(timestamp);
}
