import PropTypes from 'prop-types';

const Button = ({ icon, text, type, className, onClick, ...rest }) => {
  return (
    <button {...rest} type={type} onClick={onClick} className={className}>
      {text} {icon}
    </button>
  );
};

Button.defaultProps = {
  type: 'submit',
  className: 'btn',
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.object,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
