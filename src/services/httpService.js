import { toast } from 'react-toastify';
import axios from 'axios';

import logger from './logService';

axios.defaults.baseURL = 'https://story-books-api.herokuapp.com/api/v1';

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error('An unexpected error occurred!');
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
}

const http = {
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  delete: axios.delete,
  setJwt,
};

export default http;
