import UserData from './UserData';
import Deactivate from './Deactivate';
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
