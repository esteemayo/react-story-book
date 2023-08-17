import Logo from './Logo';
import NavItems from './NavItems';

import { useGlobalAuthContext } from 'context/auth/AuthContext';

const Navbar = () => {
  const { user, logout } = useGlobalAuthContext();

  return (
    <nav>
      <div className='nav-wrapper'>
        <Logo />
        <NavItems
          currentUser={user}
          logout={logout}
        />
      </div>
    </nav>
  );
};

export default Navbar;
