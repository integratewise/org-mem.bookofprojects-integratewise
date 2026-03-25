const STORAGE_SCOPE = 'integratewise-brand-documentations';

export function storageKey(key: string): string {
  return `${STORAGE_SCOPE}:${key}`;
}

export function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(storageKey(key));
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function saveJson<T>(key: string, value: T): void {
  window.localStorage.setItem(storageKey(key), JSON.stringify(value));
}

export function loadText(key: string, fallback = ''): string {
  try {
    return window.localStorage.getItem(storageKey(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

export function saveText(key: string, value: string): void {
  window.localStorage.setItem(storageKey(key), value);
}
