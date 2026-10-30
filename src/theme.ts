export const THEME_STORAGE_KEY = "test-react-vite-theme";

export const THEMES = ["light", "dark"] as const;

export type Theme = (typeof THEMES)[number];

export function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}

export function readStoredTheme(storage: Storage = localStorage): Theme {
  const stored = storage.getItem(THEME_STORAGE_KEY);
  return isTheme(stored) ? stored : "light";
}

export function applyTheme(theme: Theme, root: HTMLElement = document.documentElement): void {
  root.dataset.theme = theme;
}

export function persistTheme(theme: Theme, storage: Storage = localStorage): void {
  storage.setItem(THEME_STORAGE_KEY, theme);
  applyTheme(theme);
}
