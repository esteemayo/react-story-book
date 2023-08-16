import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Loader from './Loader';
import CommentCard from './CommentCard';
import UserCard from './user/UserCard';
import RelatedStories from './RelatedStories';
import CommentForm from './CommentForm';
import StoryDetail from './StoryDetail';

import * as storyAPI from 'services/storyService';
import * as actions from 'context/story/StoryTypes';

import { useGlobalContext } from 'context/story/StoryContext';

const SingleStory = () => {
  const { pathname } = useLocation();
  const path = pathname.split('/')[3];

  const { story, dispatch, isLoading, relatedStories } = useGlobalContext();

  const tags = story?.tags;

  useEffect(() => {
    (async () => {
      dispatch({ type: actions.LOADING });
      try {
        const { data: story } = await storyAPI.getWithSlug(path);
        dispatch({
          type: actions.FETCH_STORY,
          payload: story,
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, [dispatch, path]);

  useEffect(() => {
    tags && (async () => {
      dispatch({ type: actions.LOADING });
      try {
        const { data } = await storyAPI.getRelatedStories(tags);
        dispatch({
          type: actions.RELATED_STORIES,
          payload: data,
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, [dispatch, tags]);

  if (isLoading) {
    return (
      <main>
        <Loader />
      </main>
    );
  }

  return (
    <div className='row'>
      <div className='col s12 m8'>
        <StoryDetail {...story} />
        {story.allowComments && (
          <>
            <CommentForm id={story?._id} />
            {story?.comments?.map((comment) => {
              return <CommentCard key={comment._id} {...comment} />;
            })}
          </>
        )}

        <RelatedStories
          storyId={story?._id}
          relatedStories={relatedStories}
        />
      </div>
      <div className='col s12 m4'>
        <UserCard {...story} />
      </div>
    </div>
  );
};

export default SingleStory;
