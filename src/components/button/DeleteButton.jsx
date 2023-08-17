import { toast } from 'react-toastify';
import { useCallback } from 'react';
import { FaTrash } from 'react-icons/fa';
import PropTypes from 'prop-types';

import { deleteStory } from 'services/storyService';
import { useGlobalContext } from 'context/story/StoryContext';

import Button from './Button';

const DeleteButton = ({ id }) => {
  const { removeStory } = useGlobalContext();

  const handleDeleteStory = useCallback(async (id) => {
    try {
      removeStory(id);
      await deleteStory(id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error('This story has already been deleted');
    }
  }, [removeStory]);

  const handleDelete = useCallback(async (id) => {
    if (window.confirm('Are you sure you want to delete this story')) {
      await handleDeleteStory(id);
    }
  }, [handleDeleteStory]);

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

DeleteButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DeleteButton;
