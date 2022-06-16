import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import Loader from './Loader';
import UserCard from './UserCard';
import CommentCard from './CommentCard';
import CommentForm from './CommentForm';
import StoryDetail from './StoryDetail';
import { getWithSlug } from 'services/storyService';

const SingleStory = () => {
  const { pathname } = useLocation();
  const path = pathname.split('/')[3];
  const [story, setStory] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchStory = useCallback(async () => {
    try {
      setLoading(true);
      const { data: story } = await getWithSlug(path);
      setStory(story);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(true);
    }
  }, [path]);

  useEffect(() => {
    fetchStory();
  }, [fetchStory]);

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
      </div>
      <div className='col s12 m4'>
        <UserCard {...story} />
      </div>
    </div>
  );
};

export default SingleStory;
