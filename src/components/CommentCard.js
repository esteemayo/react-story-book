import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const CommentCard = ({ body, user, createdAt }) => {
  const PF = 'https://story-books-api.herokuapp.com/images/';

  return (
    <div className='card'>
      <div className='card-content'>
        <p>{body}</p>
        <div className='chip'>
          <img src={user?.photo ? PF + user.photo : user.gravatar} alt='' />
          <Link to={`/stories?author=${user.username}`}>{user.name}</Link>
        </div>
        <br />
        <small>
          Posted: <Moment format='MMMM Do YYYY'>{createdAt}</Moment>
        </small>
      </div>
    </div>
  );
};

export default CommentCard;
