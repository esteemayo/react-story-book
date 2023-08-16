import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';

import Button from './Button';
import { deleteStory } from 'services/storyService';
import { useGlobalContext } from 'context/story/StoryContext';

const DeleteButton = ({ id }) => {
  const { removeStory } = useGlobalContext();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this story')) {
      await handleDeleteStory(id);
    }
  };

  const handleDeleteStory = async (id) => {
    try {
      removeStory(id);
      await deleteStory(id);
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
