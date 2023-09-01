import http from './httpService';

export const createComment = (storyId, data) =>
  http.post(`/stories/${storyId}/comments`, data);
