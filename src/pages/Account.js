import { AccountSettings, UserProfile } from 'components';

const Account = () => {
    return (
        <div className='row'>
            <UserProfile />
            <AccountSettings />
        </div>
    );
};

export default Account;
