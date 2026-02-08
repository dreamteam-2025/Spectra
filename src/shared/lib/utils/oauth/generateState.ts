// генерирует криптографически безопасный state для OAuth,
// используя Web Crypto API (стандарт браузера)
export const generateSecureState = (length: number = 32): string => {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, "0")).join("");
};
