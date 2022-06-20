import http from './httpService';

const apiEndpoint = '/bookmarks';

export function getOneBookmark(storyId) {
  return http.get(`${apiEndpoint}/story/${storyId}`);
}

export function createBookmark(storyId) {
  return http.post(apiEndpoint, storyId);
}

export function deleteBookmark(bookmarkId) {
  return http.delete(`${apiEndpoint}/${bookmarkId}`);
}
