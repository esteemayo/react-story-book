import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';
import { likeStory } from 'services/storyService';

const useFavorite = ({ likes, user, actionId, onAction }) => {
  const hasFavorited = useMemo(() => {
    const userId = user.id ?? user?.user?._id;
    const story = likes || [];
    return story.includes(userId);
  }, [likes, user]);

  const toggleFavorite = useCallback(async () => {
    try {
      const { data: story } = await likeStory(actionId);
      onAction(story);
    } catch (err) {
      console.log(err);
    }
  }, [actionId, onAction]);

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
