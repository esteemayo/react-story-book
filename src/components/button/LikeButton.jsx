import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa';

import { likeStory } from 'services/storyService';
import { useGlobalContext } from 'context/story/StoryContext';

const LikeButton = ({ likes, user, storyId }) => {
  const { favStory } = useGlobalContext();
  const [liked, setLiked] = useState(false);

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

  const likeButton = user ? (
    liked ? (
      <span>
        <FaThumbsUp className='like-icon' />
      </span>
    ) : (
      <span>
        <FaRegThumbsUp className='like-icon' />
      </span>
    )
  ) : (
    <span>
      <Link to='/login'>
        <FaRegThumbsUp className='like-icon' />
      </Link>
    </span>
  );

  const handleLike = useCallback(async () => {
    try {
      const { data: story } = await likeStory(storyId);
      favStory(story);
    } catch (err) {
      console.log(err);
    }
  }, [favStory, storyId]);

  return (
    <button onClick={!user ? null : handleLike} className='like-btn'>
      {likeButton}
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