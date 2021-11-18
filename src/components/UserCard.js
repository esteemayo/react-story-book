import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
    const PF = 'https://story-books-api.herokuapp.com/images/';

    return (
        <div className='card center-align'>
            <div className='card-content'>
                <span className='card-title'>{user?.name}</span>
                <img
                    src={user?.photo ? PF + user.photo : user?.gravatar}
                    className='circle responsive-img'
                    alt=''
                />
            </div>
            <div className='card-action'>
                <Link to={`/stories?author=${user?.username}`}>More From {user?.firstName}</Link>
            </div>
        </div>
    );
};

export default UserCard;
