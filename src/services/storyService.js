import http from './httpService';

const apiEndPoint = '/stories';

function storyUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export function getStories(search, page) {
  return http.get(
    search ? `${apiEndPoint}${search}` : `${apiEndPoint}?page=${page}`
  );
}

export function getRelatedStories(tags) {
  return http.post(`${apiEndPoint}/related-stories`, tags);
}

export function getStory(id) {
  return http.get(storyUrl(id));
}

export function getWithSlug(slug) {
  return http.get(`${apiEndPoint}/details/${slug}`);
}

export function createStory(story) {
  return http.post(apiEndPoint, story);
}

export function updateStory(id, story) {
  return http.patch(storyUrl(id), story);
}

export function deleteStory(id) {
  return http.delete(storyUrl(id));
}
