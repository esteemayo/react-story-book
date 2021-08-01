import { FaCogs } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { deactivateAcc } from '../services/userService';
import { useGlobalContext } from '../context/Context';
import Button from './Button';
import Title from './Title';

const Deactivate = () => {
    const { logout } = useGlobalContext();

    const deleteMe = async () => {
        try {
            await deactivateAcc();
            logout();
        } catch (ex) {
            console.error(ex.response.data.message);
            toast.error(ex.response.data.message);
        }
    };

    return (
        <div className='deactivate'>
            <Title
                title='Deactivate your account'
                className='text-uppercase'
            />
            <hr />
            <blockquote>
                I would like to hereby formally request the removal of all my personal
                and private details from your company database as soon as possible.
            </blockquote>
            <blockquote>
                Note that you cannot re-activate an account that had already been
                deactivated again.
            </blockquote>
            <Button
                text='Deactivate'
                className='btn red'
                onClick={deleteMe}
                icon={<FaCogs style={iconStyling} />}
            />
        </div>
    );
};

const iconStyling = {
    fontSize: '0.8rem',
};

export default Deactivate;
