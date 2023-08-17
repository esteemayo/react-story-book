import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa';

import LikeIcon from 'components/LikeIcon';
import { useGlobalContext } from 'context/story/StoryContext';
import useFavorite from 'hooks/useFavorite';

const LikeButton = ({ likes, user, actionId }) => {
  const [liked, setLiked] = useState(false);
  const { hasFavorited, toggleFavorite } = useFavorite({
    likes,
    user,
    actionId,
  });

  useEffect(() => {
    if (
      user &&
      likes?.find((like) => like === user.id || like === user?.user?._id)
    ) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [likes, user]);

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
