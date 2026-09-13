/**
 * Placeholder thumbnail generator. Screens have no API yet, so sample
 * data needs *some* image; this stands in for a real game screenshot /
 * box-art URL until one is wired up. Shared across screens (Home,
 * SearchResults, ...) rather than duplicated per screen.
 */
export function placeholderImage(label: string, width: number, height: number): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><rect width="${width}" height="${height}" fill="#161618"/><rect x="0" y="${height - 40}" width="${width}" height="40" fill="#2a2a2e"/><text x="24" y="${height - 14}" font-family="sans-serif" font-size="16" font-weight="700" fill="#dd3c54">${label}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
