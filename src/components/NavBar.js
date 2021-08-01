import { Link } from 'react-router-dom';

import { useGlobalContext } from '../context/Context';

const NavBar = () => {
    const { user, logout } = useGlobalContext();

    return (
        <nav>
            <div className='nav-wrapper'>
                <Link to='/' className='brand-logo'>StoryBooks</Link>
                <ul id='nav-mobile' className='right hide-on-med-and-down'>
                    <li>
                        <Link to='/stories'>Home</Link>
                    </li>
                    <li>
                        <Link to='/about'>About</Link>
                    </li>
                    {user &&
                        <>
                            <li>
                                <Link to='/dashboard'>Welcome {user.firstName}</Link>
                            </li>
                            <li>
                                <Link to='/account'>Account</Link>
                            </li>
                            <li>
                                <Link to='#' onClick={logout}>Logout</Link>
                            </li>
                        </>
                    }
                    {!user &&
                        <>
                            <li>
                                <Link to='/login'>Login</Link>
                            </li>
                            <li>
                                <Link to='/register'>Register</Link>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
