import { useEffect } from 'react';

import Table from 'components/Table';
import Loader from 'components/Loader';

import { getUserStories } from 'services/userService';
import { useGlobalContext } from 'context/story/StoryContext';
import { useGlobalAuthContext } from 'context/auth/AuthContext';
import { FETCH_USER_STORIES, LOADING } from 'context/story/StoryTypes';

const DashBoard = () => {
  const { user } = useGlobalAuthContext();
  const { userStories: stories, isLoading, dispatch } = useGlobalContext();

  const columns = [
    { path: 'title', label: 'Title' },
    { path: 'createdAt', label: 'Date' },
    { path: 'status', label: 'Status' },
  ];

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
