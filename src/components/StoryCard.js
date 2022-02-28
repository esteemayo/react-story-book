import { Link } from 'react-router-dom';
import { FaPencilAlt } from 'react-icons/fa';

import { useGlobalContext } from 'context/Context';

const StoryCard = ({ body, slug, user, title }) => {
  const { user: currentUser } = useGlobalContext();
  const PF = 'https://story-books-api.herokuapp.com/images/';

  return (
    <div className='col s12 m4'>
      <div className='card card-margin'>
        <div className='card-image'>
          {currentUser && currentUser.id === user._id ? (
            <Link to={`/stories/update/${slug}`}>
              <span
                className='btn-floating halfway-fab red'
                style={{ textAlign: 'center' }}
              >
                <FaPencilAlt />
              </span>
            </Link>
          ) : (
            ''
          )}
        </div>
        <div className='card-content center-align'>
          <h5>{title}</h5>
          <p className='story-text'>{body.substr(0, 130)}...</p>
          <br />
          <div className='chip'>
            <img src={user?.photo ? PF + user.photo : user.gravatar} alt='' />
            <Link to={`/stories?author=${user.username}`}>{user.name}</Link>
          </div>
        </div>
        <div className='card-action center-align'>
          <Link to={`/stories/details/${slug}`} className='btn grey'>
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
