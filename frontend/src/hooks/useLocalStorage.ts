import { useState, useEffect, useCallback } from "react";

// https://github.com/Modernizr/Modernizr/blob/master/feature-detects/storage/localstorage.js
export function isLocalStorageAvailable() {
  try {
    const x = "__local_storage_test__";

    window.localStorage.setItem(x, x);
    window.localStorage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
}

export function getLocalStorageItem<T>(key: string, initialValue: T) {
  if (!isLocalStorageAvailable()) {
    console.warn("localStorage is not available. Using initial value.");
    return initialValue;
  }

  const item = window.localStorage.getItem(key);
  return item ? JSON.parse(item) : initialValue;
}

export function setLocalStorageItem<T>(key: string, newValue: T) {
  if (isLocalStorageAvailable()) {
    window.localStorage.setItem(key, JSON.stringify(newValue));
  } else {
    console.warn("Unable to set localStorage value");
  }
}

export function respondToLocalStorageEvent<T>(
  key: string,
  callback: (newValue: T) => void
) {
  const listener = (e: StorageEvent) => {
    if (e.key === key) callback(JSON.parse(e.newValue as string));
  };

  window.addEventListener("storage", listener);
  return listener;
}

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(
    getLocalStorageItem(key, initialValue)
  );

  const setValue = (newValue: T) => {
    setLocalStorageItem(key, newValue);
    setStoredValue(newValue);
  };

  const updateStoredValue = useCallback(() => {
    respondToLocalStorageEvent(key, (newValue: T) => setStoredValue(newValue));
  }, [key]);

  useEffect(() => {
    updateStoredValue();
  }, [updateStoredValue]);

  return [storedValue, setValue] as const;
}

export default useLocalStorage;
