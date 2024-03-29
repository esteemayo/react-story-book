import { toast } from 'react-toastify';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBookmark, FaRegBookmark, FaPencilAlt } from 'react-icons/fa';
import axios from 'axios';
import PropTypes from 'prop-types';

import * as actions from 'context/bookmark/BookMarkTypes';
import { useGlobalBookmarkContext } from 'context/bookmark/BookMarkContext';
import * as viewAction from 'context/history/HistoryTypes';
import { useGlobalHistoryContext } from 'context/history/HistoryContext';
import { useGlobalAuthContext } from 'context/auth/AuthContext';

import * as bookmarkAPI from 'services/bookmarkService';
import { createHistory, getHistoriesOnStory } from 'services/historyService';

import LikeButton from '../button/LikeButton';

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

  const setAsBookmark = useCallback(async () => {
    try {
      const { data } = await bookmarkAPI.createBookmark({ story: id });
      dispatch({
        type: actions.CREATE_BOOKMARK,
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  }, [id, dispatch]);

  const handleSetAsBookmark = useCallback(async () => {
    await setAsBookmark();
    await toast.success('Story bookmarked');
  }, [setAsBookmark]);

  const unsetBookmark = useCallback(async () => {
    try {
      await bookmarkAPI.deleteBookmark(bookmark?._id);
      dispatch({ type: actions.DELETE_BOOKMARK });
    } catch (err) {
      console.log(err);
    }
  }, [bookmark?._id, dispatch]);

  const handleUnSetAsBookmark = useCallback(async () => {
    await unsetBookmark();
    await toast.success('Story unbookmarked');
  }, [unsetBookmark]);

  const url = useMemo(() => {
    return `/stories/update/${slug}`;
  }, [slug]);

  const buttonLabel = useMemo(() => {
    return readMore ? 'Show less' : 'Read more';
  }, [readMore]);

  const viewLabel = useMemo(() => {
    return `${views?.length} views`;
  }, [views]);

  useEffect(() => {
    user && (async () => {
      const { token } = axios.CancelToken.source();
      try {
        const { data } = await bookmarkAPI.getOneBookmark(id, token);
        dispatch({
          type: actions.FETCH_BOOKMARK,
          payload: data,
        });
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log(err);
          console.log('cancelled');
        } else {
          // TODO:
        }
      }
    })();

    return () => axios.Cancel();
  }, [dispatch, id, user]);

  useEffect(() => {
    const { token } = axios.CancelToken.source();

    (async () => {
      try {
        const { data } = await getHistoriesOnStory(id, token);
        historyDispatch({
          type: viewAction.FETCH_HISTORIES,
          payload: data,
        });
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log(err);
          console.log('cancelled');
        } else {
          // TODO:
        }
      }
    })();

    return () => {
      axios.Cancel();
    };
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
          <Link to={url}>
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
              <LikeButton
                likes={likes}
                user={user}
                actionId={id}
              />
            </div>
            {user && <span>{viewLabel}</span>}
          </div>
          <blockquote>
            {body &&
              `${readMore ? body : body.split(' ').splice(0, 50).join(' ')}...`}
            {body && body.length > 50 ? (
              <button
                onClick={() => setReadMore(!readMore)}
                className='btn-readMore'
              >
                {buttonLabel}
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

StoryDetail.propTypes = {
  id: PropTypes.string,
  body: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  likes: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default StoryDetail;
