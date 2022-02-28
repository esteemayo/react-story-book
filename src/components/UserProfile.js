import Moment from 'react-moment';

import { useGlobalContext } from 'context/Context';
import { Title } from 'components';

const UserProfile = () => {
  const { user } = useGlobalContext();
  const PF = 'https://story-books-api.herokuapp.com/images/';

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
