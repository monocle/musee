import { useState, useEffect } from "react";

// https://github.com/Modernizr/Modernizr/blob/master/feature-detects/storage/localstorage.js
function localStorageAvailable() {
  try {
    const x = "__local_storage_test__";

    window.localStorage.setItem(x, x);
    window.localStorage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
}

function useLocalStorage<T>(key: string, initialValue: T) {
  const canUseLocalStorage = localStorageAvailable();
  let _initialValue: T;

  if (!canUseLocalStorage) {
    console.warn("localStorage is not available");
    _initialValue = initialValue;
  } else {
    const item = window.localStorage.getItem(key);
    _initialValue = item ? JSON.parse(item) : initialValue;
  }

  const [storedValue, setStoredValue] = useState<T>(_initialValue);

  const setValue = (value: T) => {
    if (canUseLocalStorage) {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } else {
      console.warn("Unable to set localStorage value");
    }
  };

  useEffect(() => {
    window.addEventListener("storage", (e: StorageEvent) => {
      if (e.key === key) {
        setStoredValue(JSON.parse(e.newValue as string));
      }
    });
  }, [key]);

  return [storedValue, setValue] as const;
}

export default useLocalStorage;
