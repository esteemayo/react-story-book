import { Link, NavLink } from 'react-router-dom';

import Search from '../Search';
import { useGlobalAuthContext } from 'context/auth/AuthContext';

const Navbar = () => {
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
              className={({ isActive }) => `${isActive ? 'link active' : ''}`}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/about'
              className={({ isActive }) => `${isActive ? 'link active' : ''}`}
            >
              About
            </NavLink>
          </li>
          {user && (
            <>
              <li>
                <NavLink
                  to='/dashboard'
                  className={({ isActive }) =>
                    `${isActive ? 'link active' : ''}`
                  }
                >
                  Welcome {user?.firstName || user?.user?.firstName}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/account'
                  className={({ isActive }) =>
                    `${isActive ? 'link active' : ''}`
                  }
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
                  className={({ isActive }) =>
                    `${isActive ? 'link active' : ''}`
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/register'
                  className={({ isActive }) =>
                    `${isActive ? 'link active' : ''}`
                  }
                >
                  Register
                </NavLink>
              </li>
            </>
          )}

          <li>
            <Search />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
