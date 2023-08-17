import { useCallback } from 'react';

import Logo from './Logo';
import NavItems from './NavItems';

import { useGlobalAuthContext } from 'context/auth/AuthContext';

const Navbar = () => {
  const { user, logout } = useGlobalAuthContext();

  const handleLogout = useCallback((e) => {
    e.stopPropagation();
    logout();
  }, [logout]);

  return (
    <nav>
      <div className='nav-wrapper'>
        <Logo />
        <NavItems
          currentUser={user}
          onClick={handleLogout}
        />
      </div>
    </nav>
  );
};

export default Navbar;
