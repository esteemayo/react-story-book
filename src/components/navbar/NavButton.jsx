import PropTypes from 'prop-types'

const NavButton = ({ label, onClick }) => {
  return (
    <li>
      <button onClick={onClick} className='btn-logout'>
        {label}
      </button>
    </li>
  );
};

NavButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default NavButton;
