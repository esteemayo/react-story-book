import { Deactivate, UserData, UserPassword } from 'components';

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
