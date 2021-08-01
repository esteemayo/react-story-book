import http from './httpService';

const apiEndPoint = '/users';

http.setJwt(getJwt());

export function createUser(userData) {
    return http.post(`${apiEndPoint}/signup`, userData);
};

export function loginUser(userData) {
    return http.post(`${apiEndPoint}/login`, userData);
};

export function userDashBoard() {
    return http.get(`${apiEndPoint}/dashboard`);
};

export function updateUserData(userData) {
    return http.patch(`${apiEndPoint}/update-me`, userData);
};

export function updateUserPassword(userData) {
    return http.patch(`${apiEndPoint}/update-my-password`, userData);
};

export function deactivateAcc() {
    return http.delete(`${apiEndPoint}/delete-me`);
};

function getJwt() {
    return localStorage.getItem('jwtToken');
};
