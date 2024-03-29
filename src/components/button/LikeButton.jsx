import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';

import LikeIcon from 'components/LikeIcon';
import useFavorite from 'hooks/useFavorite';

const LikeButton = ({ likes, user, actionId }) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    likes,
    user,
    actionId,
  });

  const handleLike = useCallback(async (e) => {
    e.stopPropagation();
    return !!user ? toggleFavorite() : null;
  }, [user, toggleFavorite]);

  const likeLabel = useMemo(() => {
    return `You and ${likes?.length - 1} others`;
  }, [likes]);

  return (
    <button onClick={handleLike} className='like-btn'>
      <LikeIcon
        user={user}
        liked={hasFavorited}
      />
      &nbsp;
      {user &&
        likes?.includes(user.id || user?.user?._id) &&
        likes?.length > 2 ? (
        <small>{likeLabel}</small>
      ) : (
        <small>
          {likes?.length > 0 ? likes?.length : ''}{' '}
          {`Like${likes?.length > 1 ? 's' : ''}`}
        </small>
      )}
    </button>
  );
};

LikeButton.propTypes = {
  likes: PropTypes.array.isRequired,
  user: PropTypes.object,
  actionId: PropTypes.string.isRequired,
};

export default LikeButton;
