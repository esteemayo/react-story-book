import UserProfile from '../components/UserProfile';
import AccountSettings from '../components/AccountSettings';

const Account = () => {
    return (
        <div className='row'>
            <UserProfile />
            <AccountSettings />
        </div>
    );
};

export default Account;
