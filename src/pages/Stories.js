import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import Loader from 'components/Loader';
import StoryCard from 'components/StoryCard';
import Pagination from 'components/Pagination';
import { getStories } from 'services/storyService';
import { useGlobalContext } from 'context/story/StoryContext';
import { FETCH_STORIES, LOADING } from 'context/story/StoryTypes';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Stories = () => {
  const { search, pathname } = useLocation();
  const {
    counts,
    stories,
    dispatch,
    isLoading,
    currentPage,
    numberOfPages,
    setCurrentPage,
  } = useGlobalContext();

  const query = useQuery();
  const searchQuery = query.get('q');
  const authorQuery = query.get('author');

  const fetchStories = useCallback(async () => {
    dispatch({ type: LOADING });
    const { data } = await getStories(search, currentPage);
    dispatch({
      type: FETCH_STORIES,
      payload: data,
    });
  }, [search, dispatch, currentPage]);

  useEffect(() => {
    fetchStories();
  }, [search, fetchStories]);

  if (isLoading) {
    return (
      <main>
        <Loader />
      </main>
    );
  }

  if (stories.length < 1 && pathname === '/') {
    return (
      <div className='container error-wrapper'>
        <h1 className='story-error-msg'>
          There are no stories in the database.
        </h1>
      </div>
    );
  }

  if (stories.length === 0 && pathname !== '/' && searchQuery) {
    return (
      <div className='container error-wrapper'>
        <h1 className='story-error-msg'>
          We couldn't find any matches for "{searchQuery}"
        </h1>
      </div>
    );
  }

  if (stories.length < 1 && pathname !== '/' && authorQuery) {
    return (
      <div className='container error-wrapper'>
        <h1 className='query-error-msg'>
          No author matches <span>"{authorQuery}"</span>
        </h1>
      </div>
    );
  }

  return (
    <>
      <div className='container'>
        <div className='row'>
          <h1>Stories</h1>
          {stories?.map((story) => {
            return <StoryCard key={story._id} {...story} />;
          })}
        </div>
      </div>

      <div className='container'>
        <div className='row'>
          {stories.length > 0 && !searchQuery && !authorQuery && (
            <Pagination
              counts={counts}
              currentPage={currentPage}
              numberOfPages={numberOfPages}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Stories;
