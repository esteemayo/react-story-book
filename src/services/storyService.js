import http from './httpService';

const apiEndPoint = '/stories';

const storyUrl = (storyId) => `${apiEndPoint}/${storyId}`;

export function getStories(search, page) {
  return http.get(
    search ? `${apiEndPoint}${search}` : `${apiEndPoint}?page=${page}`
  );
}

export function getRelatedStories(tags) {
  return http.post(`${apiEndPoint}/related-stories`, tags);
}

export function getStory(storyId) {
  return http.get(storyUrl(storyId));
}

export function getWithSlug(slug) {
  return http.get(`${apiEndPoint}/details/${slug}`);
}

export function searchStory(searchQuery) {
  return http.get(`${apiEndPoint}/search?q=${searchQuery}`);
}

export function createStory(story) {
  return http.post(apiEndPoint, story);
}

export function updateStory(storyId, story) {
  return http.patch(storyUrl(storyId), story);
}

export function likeStory(storyId) {
  return http.patch(`${apiEndPoint}/like/${storyId}`);
}

export function deleteStory(storyId) {
  return http.delete(storyUrl(storyId));
}
