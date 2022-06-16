import Moment from 'react-moment';

import Title from './Title';
import { useGlobalContext } from 'context/Context';

const devEnv = process.env.NODE_ENV !== 'production';
const { REACT_APP_DEV_IMAGE_API_URL, REACT_APP_PROD_IMAGE_API_URL } =
  process.env;

const UserProfile = () => {
  const { user } = useGlobalContext();

  const PF = devEnv
    ? REACT_APP_DEV_IMAGE_API_URL
    : REACT_APP_PROD_IMAGE_API_URL;

  return (
    <div className='col s6'>
      <Title title='User profile' className='text-uppercase' />
      <div className='thumbnail'>
        <img
          src={user?.photo ? PF + user.photo : user.gravatar}
          width={200}
          alt='avatar'
        />
      </div>
      <p>Name: {user.name}</p>
      <p>
        Email: <a href={`mailto:${user.email}`}>{user.email}</a>
      </p>
      <p>
        Joined: <Moment format='MMMM YYYY'>{user.createdAt}</Moment>
      </p>
    </div>
  );
};

export default UserProfile;
