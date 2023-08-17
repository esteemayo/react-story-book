import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';

import { likeStory } from 'services/storyService';
import { useGlobalContext } from 'context/story/StoryContext';

const useFavorite = ({ likes, user, actionId }) => {
  const { favStory } = useGlobalContext();

  const hasFavorited = useMemo(() => {
    const userId = user.id ?? user?.user?._id;
    const story = likes || [];
    return !!story.includes(userId);
  }, [likes, user]);

  const toggleFavorite = useCallback(async () => {
    try {
      const { data } = await likeStory(actionId);
      favStory(data);
    } catch (err) {
      console.log(err);
    }
  }, [actionId, favStory]);

  return {
    hasFavorited,
    toggleFavorite,
  };
};

useFavorite.propTypes = {
  likes: PropTypes.array.isRequired,
  user: PropTypes.object,
  actionId: PropTypes.string.isRequired,
  onAction: PropTypes.any.isRequired,
};

export default useFavorite;
