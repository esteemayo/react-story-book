import http from './httpService';

export function createComment(storyId, data) {
  return http.post(`/stories/${storyId}/comments`, data);
}
