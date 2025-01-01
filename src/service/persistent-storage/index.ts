import { PersistentStorageKeys, PersistentStorageType } from "./types";

export function setPersistentStorageItem<T extends PersistentStorageKeys>(
  key: T,
  value: PersistentStorageType[T]
) {
  if (typeof window === "undefined") {
    console.warn("LocalStorage is not available on the server.");
    return;
  }

  localStorage.setItem(key, JSON.stringify(value));
}

export function getPersistentStorageItem<T extends PersistentStorageKeys>(
  key: T
): PersistentStorageType[T] | null {
  if (typeof window === "undefined") {
    console.warn("LocalStorage is not available on the server.");
    return null;
  }

  const value = localStorage.getItem(key);

  if (!value) {
    return null;
  }

  return JSON.parse(value);
}

export function removePersistentStorageItem<T extends PersistentStorageKeys>(
  key: T
) {
  if (typeof window === "undefined") {
    console.warn("LocalStorage is not available on the server.");
    return;
  }

  localStorage.removeItem(key);
}
