import { Link, NavLink } from 'react-router-dom';

import Search from '../Search';
import NavItem from './NavItem';

const NavItems = ({ user, logout }) => {
  return (
    <ul id='nav-mobile' className='right hide-on-med-and-down'>
      <NavItem url='/stories' label='Home' />
      <NavItem url='/about' label='About' />
      {user && (
        <>
          <NavItem
            url='/dashboard'
            label={`Welcome ${user?.firstName || user?.user?.firstName}`}
          />
          <NavItem url='/account' label='Account' />
          <li>
            <Link to='#' onClick={logout}>
              Logout
            </Link>
          </li>
        </>
      )}
      {!user && (
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
