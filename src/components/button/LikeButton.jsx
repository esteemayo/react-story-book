import { useCallback, useState } from 'react';

import LikeIcon from 'components/LikeIcon';
import useFavorite from 'hooks/useFavorite';

const LikeButton = ({ likes, user, actionId }) => {
  const [liked, setLiked] = useState(false);
  const { hasFavorited, toggleFavorite } = useFavorite({
    likes,
    user,
    actionId,
  });

  const handleLike = useCallback(async () => {
    // 
  }, []);

  return (
    <button onClick={!user ? null : handleLike} className='like-btn'>
      <LikeIcon
        user={user}
        liked={hasFavorited}
      />
      &nbsp;
      {user &&
        likes?.includes(user.id || user?.user?._id) &&
        likes?.length > 2 ? (
        <small>{`You and ${likes?.length - 1} others`}</small>
      ) : (
        <small>
          {likes?.length > 0 ? likes?.length : ''}{' '}
          {`Like${likes?.length > 1 ? 's' : ''}`}
        </small>
      )}
    </button>
  );
};

export default LikeButton;
