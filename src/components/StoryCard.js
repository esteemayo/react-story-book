import { Link } from 'react-router-dom';
import { FaPencilAlt } from 'react-icons/fa';

import { excerpt } from 'utils';
import { useGlobalAuthContext } from 'context/auth/AuthContext';

const devEnv = process.env.NODE_ENV !== 'production';
const { REACT_APP_DEV_IMAGE_API_URL, REACT_APP_PROD_IMAGE_API_URL } =
  process.env;

const StoryCard = ({ body, slug, user, title }) => {
  const { user: currentUser } = useGlobalAuthContext();

  const PF = devEnv
    ? REACT_APP_DEV_IMAGE_API_URL
    : REACT_APP_PROD_IMAGE_API_URL;

  return (
    <div className='col s12 m4'>
      <div className='card card-margin custom-card'>
        <div className='card-image'>
          {currentUser &&
            (currentUser.id === user._id ||
              currentUser?.user?.id === user._id) && (
              <Link to={`/stories/update/${slug}`}>
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
          <h5 className='card-title'>{title}</h5>
          <p className='story-text'>{body && excerpt(body, 130)}</p>
          <br />
          <div className='chip'>
            <img
              src={user?.photo ? PF + user.photo : user.gravatar}
              alt='avatar'
            />
            <Link to={`/stories?author=${user.username}`}>{user.name}</Link>
          </div>
        </div>
        <div className='card-action center-align'>
          <Link to={`/stories/details/${slug}`} className='btn grey'>
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
