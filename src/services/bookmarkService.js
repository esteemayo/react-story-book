import http from './httpService';

const apiEndpoint = '/bookmarks';

export const getOneBookmark = (storyId, cancelToken) =>
  http.get(`${apiEndpoint}/story/${storyId}`, { cancelToken });

export const createBookmark = (storyId) => http.post(apiEndpoint, storyId);

export const deleteBookmark = (bookmarkId) =>
  http.delete(`${apiEndpoint}/${bookmarkId}`);
