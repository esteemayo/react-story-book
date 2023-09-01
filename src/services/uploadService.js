import http from './httpService';

const apiEndPoint = '/uploads';

export const uploadPhoto = (file) => http.post(apiEndPoint, file);
