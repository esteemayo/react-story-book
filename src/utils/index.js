import { useLocation } from 'react-router-dom';

export const tokenKey = 'jwtToken';

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const excerpt = (str, count) => {
  if (str.length > count) {
    str = str.substring(0, count) + ' ...';
  }
  return str;
};

export const getFromStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setToStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const removeFromStorage = (key) => {
  return localStorage.removeItem(key);
};
