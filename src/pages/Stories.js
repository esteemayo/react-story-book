import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useQuery } from 'utils';
import Loader from 'components/Loader';
import StoryCard from 'components/StoryCard';
import Pagination from 'components/Pagination';
import { getStories } from 'services/storyService';
import { useGlobalContext } from 'context/story/StoryContext';

const Stories = () => {
  const { search, pathname } = useLocation();
  const { counts, stories, showLoading, fetchStories, dispatch, isLoading, currentPage, numberOfPages } =
    useGlobalContext();

  const query = useQuery();
  const authorQuery = query.get('author');

  useEffect(() => {
    (async () => {
      try {
        showLoading();
        const { data } = await getStories(search, currentPage);
        fetchStories(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [fetchStories, showLoading, currentPage, dispatch, search]);

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
          {stories.length > 0 && !authorQuery && (
            <Pagination
              counts={counts}
              currentPage={currentPage}
              numberOfPages={numberOfPages}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Stories;
