import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';

const devEnv = process.env.NODE_ENV !== 'production';
const { REACT_APP_DEV_IMAGE_API_URL, REACT_APP_PROD_IMAGE_API_URL } =
  process.env;

const CommentCard = ({ body, user, createdAt }) => {
  const PF = devEnv
    ? REACT_APP_DEV_IMAGE_API_URL
    : REACT_APP_PROD_IMAGE_API_URL;

  return (
    <div className='card single-story-card'>
      <div className='card-content'>
        <p>{body}</p>
        <div className='chip'>
          <img src={user?.photo ? PF + user.photo : user.gravatar} alt='' />
          <Link to={`/stories?author=${user.username}`}>{user.name}</Link>
        </div>
        <br />
        <small>
          Posted: <Moment format='MMMM Do YYYY'>{createdAt}</Moment>
        </small>
      </div>
    </div>
  );
};

export default CommentCard;
