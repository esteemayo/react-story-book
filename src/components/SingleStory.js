import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Loader from './Loader';
import UserCard from './UserCard';
import CommentCard from './CommentCard';
import CommentForm from './CommentForm';
import StoryDetail from './StoryDetail';
import RelatedStories from './RelatedStories';
import * as storyAPI from 'services/storyService';
import * as actions from 'context/story/StoryTypes';
import { useGlobalContext } from 'context/story/StoryContext';

const SingleStory = () => {
  const { pathname } = useLocation();
  const path = pathname.split('/')[3];

  const { story, fetchStory, showLoading, dispatch, isLoading, relatedStories } = useGlobalContext();

  const tags = story?.tags;

  useEffect(() => {
    (async () => {
      showLoading();
      try {
        const { data: story } = await storyAPI.getWithSlug(path);
        fetchStory(story);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [fetchStory, showLoading, path]);

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

        <RelatedStories relatedStories={relatedStories} storyId={story?._id} />
      </div>
      <div className='col s12 m4'>
        <UserCard {...story} />
      </div>
    </div>
  );
};

export default SingleStory;
