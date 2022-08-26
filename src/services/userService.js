import http from './httpService';
import { getFromStorage, tokenKey } from 'utils';

const apiEndPoint = '/users';

export function createUser(userData) {
  return http.post(`${apiEndPoint}/signup`, userData);
}

export function loginUser(userData) {
  return http.post(`${apiEndPoint}/login`, userData);
}

export function getUserStories() {
  return http.get(`${apiEndPoint}/dashboard`);
}

export function updateUserData(userData) {
  return http.patch(`${apiEndPoint}/update-me`, userData);
}

export function updateUserPassword(userData) {
  return http.patch(`${apiEndPoint}/update-my-password`, userData);
}

export function deactivateAcc() {
  return http.delete(`${apiEndPoint}/delete-me`);
}

export function getJwt() {
  return getFromStorage(tokenKey)?.token;
}
