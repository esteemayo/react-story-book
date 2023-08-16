import Deactivate from './Deactivate';
import UserData from './user/UserData';
import UserPassword from './user/UserPassword';

const AccountSettings = () => {
  return (
    <div className='col s6'>
      <UserData />
      <UserPassword />
      <Deactivate />
    </div>
  );
};

export default AccountSettings;
