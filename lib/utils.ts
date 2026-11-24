export type ClassValue =
  | string
  | false
  | null
  | undefined
  | ClassValue[]
  | Record<string, boolean | null | undefined>;

function flatten(value: ClassValue): string[] {
  if (!value) return [];
  if (typeof value === "string") return value.split(/\s+/).filter(Boolean);
  if (Array.isArray(value)) return value.flatMap(flatten);
  return Object.entries(value)
    .filter(([, enabled]) => enabled)
    .map(([className]) => className);
}

export function cn(...inputs: ClassValue[]) {
  const classes = flatten(inputs);
  const seen = new Set<string>();

  return classes
    .filter((className) => {
      if (seen.has(className)) return false;
      seen.add(className);
      return true;
    })
    .join(" ");
}
