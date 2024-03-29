import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa';

const LikeIcon = ({ user, liked }) => {
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

  return likeButton;
};

LikeIcon.propTypes = {
  user: PropTypes.object,
  liked: PropTypes.bool.isRequired,
};

export default LikeIcon;
