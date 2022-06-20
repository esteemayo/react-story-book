import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaBookmark, FaRegBookmark, FaPencilAlt, FaEye } from 'react-icons/fa';

import * as bookmarkAPI from 'services/bookmarkService';
import * as actions from 'context/bookmark/BookMarkTypes';
import { useGlobalAuthContext } from 'context/auth/AuthContext';
import { useGlobalBookmarkContext } from 'context/bookmark/BookMarkContext';

const StoryDetail = ({ _id: id, body, slug, title, author, createdAt }) => {
  const { user } = useGlobalAuthContext();
  const { bookmark, dispatch } = useGlobalBookmarkContext();

  const [readMore, setReadMore] = useState(false);

  const handleSetAsBookmark = async () => {
    try {
      const { data } = await bookmarkAPI.createBookmark({ story: id });
      dispatch({
        type: actions.CREATE_BOOKMARK,
        payload: data,
      });
      toast.success('Story set as bookmark');
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnSetAsBookmark = async () => {
    try {
      await bookmarkAPI.deleteBookmark(bookmark?._id);
      dispatch({ type: actions.DELETE_BOOKMARK });
      toast.success('Story unset as bookmark');
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
      <div className='card story'>
        <div className='card-content'>
          <span className='card-title'>
            {new Date(createdAt).toDateString()}
          </span>
          <div className='card-wrapper'>
            {bookmark ? (
              <FaBookmark
                className='bookmark-icon'
                onClick={handleUnSetAsBookmark}
              />
            ) : (
              <FaRegBookmark
                className='bookmark-icon'
                onClick={handleSetAsBookmark}
              />
            )}
            <span>
              views <FaEye />
            </span>
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
