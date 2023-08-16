import UserProfile from 'components/UserProfile';
import AccountSettings from 'components/AccountSettings';

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
