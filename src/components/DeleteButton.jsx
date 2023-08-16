import { toast } from 'react-toastify';
import { useCallback } from 'react';
import { FaTrash } from 'react-icons/fa';

import { deleteStory } from 'services/storyService';
import { useGlobalContext } from 'context/story/StoryContext';

import Button from './Button';

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
