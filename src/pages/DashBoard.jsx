import { toast } from 'react-toastify';
import { useCallback, useEffect } from 'react';

import Loader from 'components/Loader';
import Table from 'components/table/Table';

import { useGlobalContext } from 'context/story/StoryContext';
import { FETCH_USER_STORIES, LOADING } from 'context/story/StoryTypes';
import { useGlobalAuthContext } from 'context/auth/AuthContext';

import { columns } from 'data';
import { getUserStories } from 'services/userService';
import { deleteStory } from 'services/storyService';

const DashBoard = () => {
  const { user } = useGlobalAuthContext();
  const { userStories: stories, removeStory, isLoading, dispatch } = useGlobalContext();

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

  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: LOADING });
        const { data, status, statusText } = await getUserStories();
        if (status >= 200 && status < 299) {
          dispatch({
            type: FETCH_USER_STORIES,
            payload: data,
          });
        } else {
          throw new Error(statusText);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [dispatch]);

  if (isLoading) {
    return (
      <main>
        <Loader />
      </main>
    );
  }

  if (stories.length === 0) {
    return (
      <div className='container dashboard-error'>
        <p>You have not created any stories yet</p>
      </div>
    );
  }

  return (
    <div className='container'>
      <h1>Welcome {user?.firstName}</h1>
      <h4>Your Stories</h4>
      <Table
        data={stories}
        columns={columns}
      />
    </div>
  );
};

export default DashBoard;
