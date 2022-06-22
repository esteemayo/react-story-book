import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaBookmark, FaRegBookmark, FaPencilAlt } from 'react-icons/fa';

import LikeButton from './LikeButton';
import * as bookmarkAPI from 'services/bookmarkService';
import * as actions from 'context/bookmark/BookMarkTypes';
import * as viewAction from 'context/history/HistoryTypes';
import { useGlobalAuthContext } from 'context/auth/AuthContext';
import { useGlobalHistoryContext } from 'context/history/HistoryContext';
import { useGlobalBookmarkContext } from 'context/bookmark/BookMarkContext';
import { createHistory, getHistoriesOnStory } from 'services/historyService';

const StoryDetail = ({
  _id: id,
  body,
  slug,
  likes,
  title,
  author,
  createdAt,
}) => {
  const { user } = useGlobalAuthContext();
  const { bookmark, dispatch } = useGlobalBookmarkContext();
  const { views, dispatch: historyDispatch } = useGlobalHistoryContext();

  const [readMore, setReadMore] = useState(false);

  const handleSetAsBookmark = async () => {
    try {
      const { data } = await bookmarkAPI.createBookmark({ story: id });
      dispatch({
        type: actions.CREATE_BOOKMARK,
        payload: data,
      });
      toast.success('Story bookmarked');
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnSetAsBookmark = async () => {
    try {
      await bookmarkAPI.deleteBookmark(bookmark?._id);
      dispatch({ type: actions.DELETE_BOOKMARK });
      toast.success('Story unbookmarked');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchBookmark = async () => {
      try {
        const { data } = await bookmarkAPI.getOneBookmark(id);
        dispatch({
          type: actions.FETCH_BOOKMARK,
          payload: data,
        });
      } catch (err) {
        console.log(err);
      }
    };

    user && fetchBookmark();
  }, [dispatch, id, user]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getHistoriesOnStory(id);
        historyDispatch({
          type: viewAction.FETCH_HISTORIES,
          payload: data,
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, [historyDispatch, id]);

  useEffect(() => {
    user &&
      (async () => {
        try {
          const { data } = await createHistory({ story: id });
          historyDispatch({
            type: viewAction.CREATE_HISTORIES,
            payload: data,
          });
        } catch (err) {
          console.log(err);
        }
      })();
  }, [historyDispatch, id, user]);

  return (
    <>
      <h3 className='heading-tertiary'>
        {title}
        {user && (user.username === author || user?.user?.username === author) && (
          <Link to={`/stories/update/${slug}`}>
            <small>
              {' '}
              <FaPencilAlt />
            </small>
          </Link>
        )}
      </h3>
      <div className='card story single-story-card'>
        <div className='card-content'>
          <span className='card-title'>
            {new Date(createdAt).toDateString()}
          </span>
          <div className='card-wrapper'>
            <div className='card-container'>
              {user && bookmark && (
                <FaBookmark
                  className='bookmark-icon'
                  onClick={handleUnSetAsBookmark}
                />
              )}

              {user && !bookmark && (
                <FaRegBookmark
                  className='bookmark-icon'
                  onClick={handleSetAsBookmark}
                />
              )}
              <LikeButton likes={likes} user={user} storyId={id} />
            </div>
            {user && <span>{views?.length} views</span>}
          </div>
          <blockquote>
            {body &&
              `${readMore ? body : body.split(' ').splice(0, 50).join(' ')}...`}
            {body && body.length > 50 ? (
              <button
                onClick={() => setReadMore(!readMore)}
                className='btn-readMore'
              >
                {readMore ? 'Show less' : 'Read more'}
              </button>
            ) : (
              body
            )}
          </blockquote>
        </div>
      </div>
    </>
  );
};

export default StoryDetail;
