import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const NavItem = ({ url, label }) => {
  return (
    <li>
      <NavLink
        to={url}
        className={({ isActive }) => `${isActive ? 'link active' : ''}`}
      >
        {label}
      </NavLink>
    </li>
  );
};

NavItem.propTypes = {
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default NavItem;
