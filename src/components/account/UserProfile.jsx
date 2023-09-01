import { useMemo } from 'react';

import Title from '../Title';
import DateTime from 'components/DateTime';

import { useGlobalAuthContext } from 'context/auth/AuthContext';

const devEnv = process.env.NODE_ENV !== 'production';
const { REACT_APP_DEV_IMAGE_API_URL, REACT_APP_PROD_IMAGE_API_URL } =
  process.env;

const UserProfile = () => {
  const { user } = useGlobalAuthContext();

  const PF = useMemo(() => {
    return devEnv ?
      REACT_APP_DEV_IMAGE_API_URL :
      REACT_APP_PROD_IMAGE_API_URL;
  }, []);

  const avatar = useMemo(() => {
    return user?.photo
      ? PF + user.photo
      : user.gravatar || user?.user?.photo
        ? PF + user?.user?.photo
        : user?.user?.gravatar;
  }, [PF, user]);

  return (
    <div className='col s6'>
      <Title title='User profile' className='text-uppercase' />
      <div className='thumbnail'>
        <img
          src={avatar}
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
          Joined: <DateTime date={user.createdAt} />
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
