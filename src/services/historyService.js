import http from './httpService';

const apiEndpoint = '/histories';

export function getHistoriesOnStory(storyId) {
  return http.get(`${apiEndpoint}/story/${storyId}`);
}

export function createHistory(story) {
  return http.post(apiEndpoint, story);
}
