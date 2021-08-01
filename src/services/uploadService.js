import http from './httpService';

const apiEndPoint = '/uploads';

export function uploadPhoto(file) {
    return http.post(apiEndPoint, file);
};
