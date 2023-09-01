import http from './httpService';

const apiEndPoint = '/stories';

const storyUrl = (storyId) => `${apiEndPoint}/${storyId}`;

export const getStories = (search, page) =>
  http.get(
    search ? `${apiEndPoint}${search}` : `${apiEndPoint}?page=${page}`
  );

export const getRelatedStories = (tags) =>
  http.post(`${apiEndPoint}/related-stories`, tags);

export const getStory = (storyId) => http.get(storyUrl(storyId));

export const getWithSlug = (slug) =>
  http.get(`${apiEndPoint}/details/${slug}`);

export const searchStory = (searchQuery) =>
  http.get(`${apiEndPoint}/search?q=${searchQuery}`);

export const createStory = (story) => http.post(apiEndPoint, story);

export const updateStory = (storyId, story) =>
  http.patch(storyUrl(storyId), story);

export const likeStory = (storyId) =>
  http.patch(`${apiEndPoint}/like/${storyId}`);

export const deleteStory = (storyId) =>
  http.delete(storyUrl(storyId));
