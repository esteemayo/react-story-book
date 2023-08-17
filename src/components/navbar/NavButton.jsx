import PropTypes from 'prop-types'

const NavButton = ({ logout }) => {
  return (
    <li>
      <button onClick={logout}>
        Logout
      </button>
    </li>
  );
};

NavButton.propTypes = {};

export default NavButton;
