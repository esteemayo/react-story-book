import { Link } from 'react-router-dom';
import MenuItem from './MenuItem';

const MenuItems = () => {
  return (
    <ul>
      <li>
        <Link className='grey-text text-lighten-3' to='/stories'>
          Public Stories
        </Link>
      </li>
      <li>
        <Link className='grey-text text-lighten-3' to='/about'>
          About
        </Link>
      </li>
    </ul>
  );
};

export default MenuItems;
