import { Link } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';

import { useGlobalContext } from 'context/Context';

const Home = () => {
    const { user } = useGlobalContext();

    return (
        <div>
            <h1>Welcome</h1>
            <p>Welcome to StoryBooks 1.0.0</p>
            <p>
                Post stories from the best and worst of your life and choose for them to be read by the world or completely private as your own personal diary.
            </p>
            <br />
            {!user && (
                <Link className="btn red darken-1" to="/login">
                    <FaSignInAlt style={iconStyle} />{' '}
                    Login into your account
                </Link>
            )}
        </div>
    );
};

const iconStyle = {
    fontSize: '0.8rem',
};

export default Home;
