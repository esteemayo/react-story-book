import { toast } from 'react-toastify';
import { useCallback } from 'react';
import { FaTrash } from 'react-icons/fa';
import PropTypes from 'prop-types';

import Button from './Button';

const DeleteButton = ({ actionId, onAction }) => {
  return (
    <Button
      type='button'
      text='Delete'
      className='btn red'
      icon={<FaTrash />}
      onClick={() => onAction(actionId)}
    />
  );
};

DeleteButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DeleteButton;
