import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { searchStory } from 'services/storyService';
import { useGlobalContext } from 'context/story/StoryContext';
import { useGlobalAuthContext } from 'context/auth/AuthContext';
import { HIDE_LOADING, LOADING, SEARCH_STORY } from 'context/story/StoryTypes';

const NavBar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const { dispatch } = useGlobalContext();
  const { user, logout } = useGlobalAuthContext();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search) {
      dispatch({ type: LOADING });
      try {
        const { data } = await searchStory(search);
        dispatch({
          type: SEARCH_STORY,
          payload: data,
        });
        dispatch({ type: HIDE_LOADING });
        navigate(`/stories/search?q=${search}`);
        setSearch('');
      } catch (err) {
        console.log(err);
      }
    } else {
      navigate('/stories');
    }
  };

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
              className={({ isActive }) => isActive && 'link active'}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/about'
              className={({ isActive }) => isActive && 'link active'}
            >
              About
            </NavLink>
          </li>
          {user && (
            <>
              <li>
                <NavLink
                  to='/dashboard'
                  className={({ isActive }) => isActive && 'link active'}
                >
                  Welcome {user?.firstName || user?.user?.firstName}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/account'
                  className={({ isActive }) => isActive && 'link active'}
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
                  className={({ isActive }) => isActive && 'link active'}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/register'
                  className={({ isActive }) => isActive && 'link active'}
                >
                  Register
                </NavLink>
              </li>
            </>
          )}

          <li>
            <form onSubmit={handleSearch}>
              <div className='form-group'>
                <input
                  type='search'
                  className='form-input'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className='btn-search'>
                  <FaSearch className='search-icon' />
                </button>
              </div>
            </form>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
