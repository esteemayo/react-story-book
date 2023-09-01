import http from './httpService';

const apiEndpoint = '/histories';

export function getHistoriesOnStory(storyId, cancelToken) {
  return http.get(`${apiEndpoint}/story/${storyId}`, { cancelToken });
}

export function createHistory(story) {
  return http.post(apiEndpoint, story);
}
