import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
    const PF = 'http://localhost:9090/images/';

    return (
        <div className='card center-align'>
            <div className='card-content'>
                <span className='card-title'>{user && user.name}</span>
                <img
                    src={user && user.photo ? PF + user.photo : user && user.gravatar ? user.gravatar : ''}
                    className='circle responsive-img'
                    alt=''
                />
            </div>
            <div className='card-action'>
                <Link to={`/stories?author=${user && user.username}`}>More From {user && user.firstName}</Link>
            </div>
        </div>
    );
};

export default UserCard;
