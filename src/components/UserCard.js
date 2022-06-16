import { Link } from 'react-router-dom';

const devEnv = process.env.NODE_ENV !== 'production';
const { REACT_APP_DEV_IMAGE_API_URL, REACT_APP_PROD_IMAGE_API_URL } =
  process.env;

const UserCard = ({ user }) => {
  const PF = devEnv
    ? REACT_APP_DEV_IMAGE_API_URL
    : REACT_APP_PROD_IMAGE_API_URL;

  return (
    <div className='card center-align'>
      <div className='card-content'>
        <span className='card-title'>{user?.name}</span>
        <img
          src={user?.photo ? PF + user.photo : user?.gravatar}
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
