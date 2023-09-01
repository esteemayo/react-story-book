import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import PropTypes from 'prop-types';

import DateTime from 'components/DateTime';

const devEnv = process.env.NODE_ENV !== 'production';
const { REACT_APP_DEV_IMAGE_API_URL, REACT_APP_PROD_IMAGE_API_URL } =
  process.env;

const CommentCard = ({ body, user, createdAt }) => {
  const PF = useMemo(() => {
    return devEnv ?
      REACT_APP_DEV_IMAGE_API_URL :
      REACT_APP_PROD_IMAGE_API_URL;
  }, []);

  const avatar = useMemo(() => {
    return user?.photo ? PF + user.photo : user.gravatar;
  }, [PF, user]);

  const url = useMemo(() => {
    return `/stories?author=${user.username}`;
  }, [user]);

  return (
    <div className='card single-story-card'>
      <div className='card-content'>
        <p>{body}</p>
        <div className='chip'>
          <img src={avatar} alt='' />
          <Link to={url}>{user.name}</Link>
        </div>
        <br />
        <small>
          Posted: <Moment format='MMMM Do YYYY'>{createdAt}</Moment>
        </small>
      </div>
    </div>
  );
};

CommentCard.propTypes = {
  body: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default CommentCard;
