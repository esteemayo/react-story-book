import http from './httpService';
import { getFromStorage, tokenKey } from 'utils';

const apiEndPoint = '/users';

export const createUser = (userData) =>
  http.post(`${apiEndPoint}/signup`, userData);

export const loginUser = (userData) =>
  http.post(`${apiEndPoint}/login`, userData);

export const getUserStories = () => {
  return http.get(`${apiEndPoint}/dashboard`);
}

export const updateUserData = (userData) => {
  return http.patch(`${apiEndPoint}/update-me`, userData);
}

export const updateUserPassword = (userData) => {
  return http.patch(`${apiEndPoint}/update-my-password`, userData);
}

export const deactivateAcc = () => {
  return http.delete(`${apiEndPoint}/delete-me`);
}

export const getJwt = () => getFromStorage(tokenKey)?.token;
