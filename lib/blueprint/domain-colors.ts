const palette = [
  "bg-teal-500",
  "bg-blue-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-emerald-500",
];

export function getDomainColor(domain: string, domains: string[]) {
  const index = domains.indexOf(domain);
  return palette[index >= 0 ? index % palette.length : 0];
}
