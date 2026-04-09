// Generates a consistent, unique avatar URL for each user based on their name
const AVATAR_COLORS = [
  "6366f1", // indigo
  "ec4899", // pink
  "f59e0b", // amber
  "10b981", // emerald
  "3b82f6", // blue
  "8b5cf6", // violet
  "ef4444", // red
  "14b8a6", // teal
  "f97316", // orange
  "06b6d4", // cyan
  "84cc16", // lime
  "a855f7", // purple
];

function hashName(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export function getUserAvatarUrl(firstName: string, lastName: string, size = 128): string {
  const name = `${firstName} ${lastName}`.trim();
  const colorIndex = hashName(name) % AVATAR_COLORS.length;
  const bg = AVATAR_COLORS[colorIndex];
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(firstName)}+${encodeURIComponent(lastName)}&background=${bg}&color=fff&size=${size}&bold=true`;
}

export function getUserInitials(firstName: string, lastName: string): string {
  return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
}
