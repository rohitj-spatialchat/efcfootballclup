const AVATAR_COLORS = [
  "#6366f1",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#3b82f6",
  "#8b5cf6",
  "#ef4444",
  "#14b8a6",
  "#f97316",
  "#06b6d4",
  "#84cc16",
  "#a855f7",
];

function hashName(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export function getUserInitials(firstName: string, lastName: string): string {
  return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
}

export function getUserAvatarUrl(firstName: string, lastName: string, size = 128): string {
  const safeFirstName = firstName?.trim() || "Guest";
  const safeLastName = lastName?.trim() || "User";
  const name = `${safeFirstName} ${safeLastName}`.trim();
  const initials = getUserInitials(safeFirstName, safeLastName) || "GU";
  const background = AVATAR_COLORS[hashName(name) % AVATAR_COLORS.length];
  const fontSize = Math.round(size * 0.36);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img" aria-label="${name}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="${background}" />
      <text x="50%" y="50%" dy="0.1em" text-anchor="middle" dominant-baseline="middle" fill="white" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="700" letter-spacing="1">${initials}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function isAvatarImageSource(value?: string): boolean {
  return Boolean(value && (value.startsWith("http") || value.startsWith("data:image") || value.startsWith("blob:")));
}
