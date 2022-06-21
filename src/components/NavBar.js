import { Link, NavLink } from 'react-router-dom';
import { useGlobalAuthContext } from 'context/auth/AuthContext';

const NavBar = () => {
  const { user, logout } = useGlobalAuthContext();

  return (
    <nav>
      <div className='nav-wrapper'>
        <Link to='/' className='brand-logo'>
          StoryBooks
        </Link>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
          <li>
            <NavLink
              to='/stories'
              className={({ isActive }) => isActive && 'active'}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/about'
              className={({ isActive }) => isActive && 'active'}
            >
              About
            </NavLink>
          </li>
          {user && (
            <>
              <li>
                <NavLink
                  to='/dashboard'
                  className={({ isActive }) => isActive && 'active'}
                >
                  Welcome {user?.firstName || user?.user?.firstName}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/account'
                  className={({ isActive }) => isActive && 'active'}
                >
                  Account
                </NavLink>
              </li>
              <li>
                <Link to='#' onClick={logout}>
                  Logout
                </Link>
              </li>
            </>
          )}
          {!user && (
            <>
              <li>
                <NavLink
                  to='/login'
                  className={({ isActive }) => isActive && 'active'}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/register'
                  className={({ isActive }) => isActive && 'active'}
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
