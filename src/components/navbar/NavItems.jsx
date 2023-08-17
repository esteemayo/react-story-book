import { useMemo } from 'react';
import PropTypes from 'prop-types';

import NavItem from './NavItem';
import Search from '../Search';
import NavButton from './NavButton';

const NavItems = ({ currentUser, onClick }) => {
  const username = useMemo(() => {
    return (currentUser?.firstName || currentUser?.currentUser?.firstName);
  }, [currentUser]);

  return (
    <ul id='nav-mobile' className='right hide-on-med-and-down'>
      <NavItem url='/stories' label='Home' />
      <NavItem url='/about' label='About' />
      {!!currentUser && (
        <>
          <NavItem
            url='/dashboard'
            label={`Welcome ${username}`}
          />
          <NavItem url='/account' label='Account' />
          <NavButton
            label='Logout'
            onClick={onClick}
          />
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

NavItems.propTypes = {
  currentUser: PropTypes.object,
  onClick: PropTypes.func.isRequired,
};

export default NavItems;
