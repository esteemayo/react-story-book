import Deactivate from './Deactivate';
import UserData from './UserData';
import UserPassword from './UserPassword';

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
