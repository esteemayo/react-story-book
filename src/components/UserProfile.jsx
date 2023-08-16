import { useMemo } from 'react';
import Moment from 'react-moment';

import Title from './Title';
import { useGlobalAuthContext } from 'context/auth/AuthContext';

const devEnv = process.env.NODE_ENV !== 'production';
const { REACT_APP_DEV_IMAGE_API_URL, REACT_APP_PROD_IMAGE_API_URL } =
  process.env;

const UserProfile = () => {
  const { user } = useGlobalAuthContext();

  const PF = devEnv
    ? REACT_APP_DEV_IMAGE_API_URL
    : REACT_APP_PROD_IMAGE_API_URL;

  return (
    <div className='col s6'>
      <Title title='User profile' className='text-uppercase' />
      <div className='thumbnail'>
        <img
          src={
            user?.photo
              ? PF + user.photo
              : user.gravatar || user?.user?.photo
                ? PF + user?.user?.photo
                : user?.user?.gravatar
          }
          width={200}
          alt='avatar'
        />
      </div>

      <div className='user-info'>
        <p>Name: {user.name}</p>
        <p>
          Email: <a href={`mailto:${user.email}`}>{user.email}</a>
        </p>
        <p>
          Joined: <Moment format='MMMM YYYY'>{user.createdAt}</Moment>
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
