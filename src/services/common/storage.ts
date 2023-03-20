import { LOCALSTORAGE } from 'utils/constants';

let accessToken = window.localStorage.getItem(LOCALSTORAGE.NICI_TOKEN);
let refreshToken = window.localStorage.getItem(LOCALSTORAGE.NICI_REFRESH_TOKEN);

/**
 * Listen for changes from other tabs
 */
window.addEventListener('storage', (event) => {
  if (event.key === LOCALSTORAGE.NICI_TOKEN) {
    accessToken = event.newValue;
  }
});

export const getAccessToken = (): string | null => accessToken;

export const setAccessToken = (token: string): void => {
  accessToken = token;
  window.localStorage.setItem(LOCALSTORAGE.NICI_TOKEN, token);
};
export const getRefreshToken = (): string | null => refreshToken;

export const setRefreshToken = (token: string): void => {
  refreshToken = token;
  window.localStorage.setItem(LOCALSTORAGE.NICI_REFRESH_TOKEN, token);
};

export const removeAccessToken = (): void => {
  accessToken = null;
  window.localStorage.removeItem(LOCALSTORAGE.NICI_TOKEN);
};

export const removeRefreshToken = (): void => {
  accessToken = null;
  window.localStorage.removeItem(LOCALSTORAGE.NICI_REFRESH_TOKEN);
};

export const setLocalStorage = (name: string, value: string) => {
  window.localStorage.setItem(name, value);
};

export const getLocalStorage = (name: string): string | null => window.localStorage.getItem(name);

export const clearLocalStorage = () => {
  window.localStorage.clear();
};
