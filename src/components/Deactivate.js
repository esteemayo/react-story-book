import axios from 'axios';
import { toast } from 'react-toastify';
import { FaCogs } from 'react-icons/fa';

import Title from './Title';
import Button from './Button';
import { useGlobalAuthContext } from 'context/auth/AuthContext';

const devEnv = process.env.NODE_ENV !== 'production';
const { REACT_APP_DEV_API_URL, REACT_APP_PROD_API_URL } = process.env;

const Deactivate = () => {
  const { logout } = useGlobalAuthContext();

  const deleteMe = async () => {
    try {
      await axios.delete(
        `${
          devEnv ? REACT_APP_DEV_API_URL : REACT_APP_PROD_API_URL
        }/users/delete-me`
      );
      logout();
    } catch (ex) {
      console.error(ex.response.data.message);
      toast.error(ex.response.data.message);
    }
  };

  return (
    <div className='deactivate'>
      <Title title='Deactivate your account' className='text-uppercase' />
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
