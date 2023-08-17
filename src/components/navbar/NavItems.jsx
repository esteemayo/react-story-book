import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Search from '../Search';
import NavItem from './NavItem';

const NavItems = ({ currentUser, logout }) => {
  const username = useMemo(() => {
    return (currentUser?.firstName || currentUser?.currentUser?.firstName);
  }, [currentUser]);

  return (
    <ul id='nav-mobile' className='right hide-on-med-and-down'>
      <NavItem url='/stories' label='Home' />
      <NavItem url='/about' label='About' />
      {currentUser && (
        <>
          <NavItem
            url='/dashboard'
            label={`Welcome ${username}`}
          />
          <NavItem url='/account' label='Account' />
          <li>
            <Link to='#' onClick={logout}>
              Logout
            </Link>
          </li>
        </>
      )}
      {!currentUser && (
        <>
          <NavItem url='/login' label='Login' />
          <NavItem url='/register' label='Register' />
        </>
      )}
      <li>
        <Search />
      </li>
    </ul>
  );
};

export default NavItems;
