import { useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import Loader from './Loader';
import UserCard from './UserCard';
import CommentCard from './CommentCard';
import CommentForm from './CommentForm';
import StoryDetail from './StoryDetail';
import RelatedStories from './RelatedStories';
import { useGlobalContext } from 'context/story/StoryContext';
import { LOADING, RELATED_STORIES } from 'context/story/StoryTypes';
import { getRelatedStories, getWithSlug } from 'services/storyService';

const SingleStory = () => {
  const { pathname } = useLocation();
  const path = pathname.split('/')[3];
  const [story, setStory] = useState({});
  const [loading, setLoading] = useState(false);

  const { dispatch, relatedStories } = useGlobalContext();

  const tags = story?.tags;

  const fetchStory = useCallback(async () => {
    setLoading(true);
    try {
      const { data: story } = await getWithSlug(path);
      setStory(story);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, [path]);

  useEffect(() => {
    fetchStory();
  }, [fetchStory]);

  useEffect(() => {
    const fetchRelatedStories = async () => {
      dispatch({ type: LOADING });
      try {
        const { data } = await getRelatedStories(tags);
        console.log(data);
        dispatch({
          type: RELATED_STORIES,
          payload: data,
        });
      } catch (err) {
        console.log(err);
      }
    };

    tags && fetchRelatedStories();
  }, [dispatch, tags]);

  if (loading) {
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
            <CommentForm id={story._id} />
            {story?.comments.map((comment) => {
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
