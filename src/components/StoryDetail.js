import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPencilAlt } from 'react-icons/fa';

import { useGlobalAuthContext } from 'context/auth/AuthContext';

const StoryDetail = ({ body, slug, title, author, createdAt }) => {
  const { user } = useGlobalAuthContext();
  const [readMore, setReadMore] = useState(false);

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
