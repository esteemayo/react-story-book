import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';

import { excerpt } from 'utils';
import LikeButton from '../button/LikeButton';

import { useGlobalAuthContext } from 'context/auth/AuthContext';

const devEnv = process.env.NODE_ENV !== 'production';
const { REACT_APP_DEV_IMAGE_API_URL, REACT_APP_PROD_IMAGE_API_URL } =
  process.env;

const StoryCard = ({
  _id: id,
  body,
  slug,
  user,
  likes,
  title,
}) => {
  const { user: currentUser } = useGlobalAuthContext();

  const PF = useMemo(() => {
    return devEnv
      ? REACT_APP_DEV_IMAGE_API_URL
      : REACT_APP_PROD_IMAGE_API_URL;
  }, []);

  const avatar = useMemo(() => {
    return user?.photo ? PF + user.photo : user.gravatar;
  }, [user, PF]);

  const url = useMemo(() => {
    return `/stories/details/${slug}`;
  }, [slug]);

  const updateUrl = useMemo(() => {
    return `/stories/update/${slug}`;
  }, [slug]);

  return (
    <div className='col s12 m4'>
      <div className='card card-margin custom-card'>
        <div className='card-image'>
          {!!currentUser &&
            (currentUser.id === user._id ||
              currentUser?.user?.id === user._id) && (
              <Link to={updateUrl}>
                <span
                  className='btn-floating halfway-fab red'
                  style={{ textAlign: 'center' }}
                >
                  <FaPencilAlt />
                </span>
              </Link>
            )}
        </div>
        <div className='card-content center-align'>
          <h5 className='card-header'>{title}</h5>
          <p className='story-text'>{body && excerpt(body, 100)}</p>
          <br />
          <div className='chip'>
            <img src={avatar} alt='avatar' />
            <Link to={`/stories?author=${user.username}`}>
              {user.name}
            </Link>
          </div>
          <div className='like-container'>
            <LikeButton
              likes={likes}
              user={currentUser}
              actionId={id}
            />
          </div>
        </div>
        <div className='card-action center-align'>
          <Link to={url} className='btn grey'>
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

StoryCard.propTypes = {
  _id: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  likes: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default StoryCard;
