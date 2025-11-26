export function isValidTitle(title: string): boolean {
  const trimmed = title.trim();
  return trimmed.length > 0;
}
