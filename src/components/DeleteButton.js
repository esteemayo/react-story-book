import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';

import Button from './Button';
import { DELETE_STORY } from 'context/types';
import { deleteStory } from 'services/storyService';
import { useGlobalContext } from 'context/Context';

const DeleteButton = ({ id }) => {
  const { dispatch } = useGlobalContext();

  const handleDelete = async (id) => {
    try {
      dispatch({
        type: DELETE_STORY,
        payload: id,
      });
      await deleteStory(id);
      window.location.reload();
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error('This story has already been deleted');
    }
  };

  return (
    <Button
      type='button'
      text='Delete'
      className='btn red'
      icon={<FaTrash />}
      onClick={() => handleDelete(id)}
    />
  );
};

export default DeleteButton;
