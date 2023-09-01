import http from './httpService';

const apiEndpoint = '/histories';

export const getHistoriesOnStory = (storyId, cancelToken) =>
  http.get(`${apiEndpoint}/story/${storyId}`, { cancelToken });

export const createHistory = (story) => http.post(apiEndpoint, story);
