import PropTypes from 'prop-types';
import { FaTrash } from 'react-icons/fa';

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
  actionId: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
};

export default DeleteButton;
