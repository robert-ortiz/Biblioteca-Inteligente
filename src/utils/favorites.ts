const FAVORITES_KEY = "biblioteca_favorites";

export function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveFavorites(ids: string[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  } catch {}
}

export function isFavorite(id?: string): boolean {
  if (!id) return false;
  return getFavorites().includes(id);
}

export function toggleFavorite(id?: string): boolean {
  if (!id) return false;
  const favs = getFavorites();
  const idx = favs.indexOf(id);
  if (idx >= 0) {
    favs.splice(idx, 1);
    saveFavorites(favs);
    return false;
  }

  favs.push(id);
  saveFavorites(favs);
  return true;
}

export default { getFavorites, saveFavorites, isFavorite, toggleFavorite };
