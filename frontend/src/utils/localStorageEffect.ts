import type { AtomEffect } from "recoil";

const localStorageEffect = (key: string): AtomEffect<any> => ({ setSelf, onSet }) => {
  const savedValue = localStorage.getItem(key);
  if (savedValue !== null) {
    setSelf(JSON.parse(savedValue));
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
