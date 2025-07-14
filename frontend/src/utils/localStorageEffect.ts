import type { AtomEffect } from "recoil";

const localStorageEffect = (key: string): AtomEffect<any> => ({ setSelf, onSet }) => {
  const savedValue = localStorage.getItem(key);

  if (savedValue !== null) {
    try {
      setSelf(JSON.parse(savedValue));
    } catch (err) {
      console.warn(`localStorage "${key}" has invalid JSON. Clearing...`, err);
      localStorage.removeItem(key); // Optional: clear bad data
    }
  }

  onSet((newValue) => {
    if (newValue === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  });
};

export default localStorageEffect;
