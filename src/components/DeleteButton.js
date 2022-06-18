import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';

import Button from './Button';
import { deleteStory } from 'services/storyService';
import { DELETE_STORY } from 'context/story/StoryTypes';
import { useGlobalContext } from 'context/story/StoryContext';

const DeleteButton = ({ id }) => {
  const { dispatch } = useGlobalContext();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this story')) {
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
