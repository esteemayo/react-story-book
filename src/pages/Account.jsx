import UserProfile from 'components/account/UserProfile';
import AccountSettings from 'components/account/AccountSettings';

const Account = () => {
  return (
    <div className='container'>
      <div className='row'>
        <UserProfile />
        <AccountSettings />
      </div>
    </div>
  );
};

export default Account;
