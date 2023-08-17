import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MenuItem = ({ path, label }) => {
  return (
    <li>
      <Link className='grey-text text-lighten-3' to={path}>
        {label}
      </Link>
    </li>
  );
};

MenuItem.propTypes = {
  path: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default MenuItem;
