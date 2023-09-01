import { toast } from 'react-toastify';
import { useCallback, useEffect } from 'react';
import { withSwal } from 'react-sweetalert2';

import Loader from 'components/Loader';
import Table from 'components/table/Table';

import { useGlobalContext } from 'context/story/StoryContext';
import { FETCH_USER_STORIES, LOADING } from 'context/story/StoryTypes';
import { useGlobalAuthContext } from 'context/auth/AuthContext';

import { columns } from 'data';
import { getUserStories } from 'services/userService';
import { deleteStory } from 'services/storyService';

const DashBoard = ({ swal }) => {
  const { user } = useGlobalAuthContext();
  const {
    userStories: stories,
    removeStory,
    isLoading,
    dispatch,
  } = useGlobalContext();

  const handleDeleteStory = useCallback(async (storyId) => {
    try {
      removeStory(storyId);
      await deleteStory(storyId);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error('This story has already been deleted');
    }
  }, [removeStory]);

  const handleDelete = useCallback(async (storyId) => {
    swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#26a69a',
      cancelButtonColor: '#f44336',
      confirmButtonText: 'Yes, Delete!',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleDeleteStory(storyId);
        await swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    }).catch((err) => {
      console.log(err);
    });
  }, [swal, handleDeleteStory]);

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
        onDelete={handleDelete}
      />
    </div>
  );
};

export default withSwal(({ swal }, ref) => (
  <DashBoard swal={swal} />
));
