import { toast } from 'react-toastify';
import { useCallback } from 'react';
import { FaCogs } from 'react-icons/fa';

import Title from './Title';
import Button from './Button';

import { deactivateAcc } from 'services/userService';
import { useGlobalAuthContext } from 'context/auth/AuthContext';

const Deactivate = () => {
  const { logout } = useGlobalAuthContext();

  const handleDelete = useCallback(async () => {
    try {
      await deactivateAcc();
    } catch (ex) {
      console.error(ex.response.data.message);
      toast.error(ex.response.data.message);
    }
  }, []);

  const deleteMe = useCallback(async () => {
    await handleDelete();
    await logout();
  }, [handleDelete, logout]);

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
