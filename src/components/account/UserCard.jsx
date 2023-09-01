import { useMemo } from 'react';
import { Link } from 'react-router-dom';

const devEnv = process.env.NODE_ENV !== 'production';
const { REACT_APP_DEV_IMAGE_API_URL, REACT_APP_PROD_IMAGE_API_URL } =
  process.env;

const UserCard = ({ user }) => {
  const PF = useMemo(() => {
    return devEnv ?
      REACT_APP_DEV_IMAGE_API_URL :
      REACT_APP_PROD_IMAGE_API_URL;
  }, []);

  const avatar = useMemo(() => {
    return user?.photo ? PF + user.photo : user?.gravatar;
  }, [PF, user]);

  return (
    <div className='card center-align single-story-card'>
      <div className='card-content'>
        <span className='card-title'>{user?.name}</span>
        <img
          src={avatar}
          className='circle responsive-img'
          alt=''
        />
      </div>
      <div className='card-action'>
        <Link to={`/stories?author=${user?.username}`}>
          More From {user?.firstName}
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
