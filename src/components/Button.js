import PropTypes from 'prop-types';

const Button = ({ icon, text, className, onClick, ...rest }) => {
    return (
        <button
            {...rest}
            onClick={onClick}
            className={className}
        >
            {text} {icon}
        </button>
    );
};

Button.defaultProps = {
    type: 'submit',
    className: 'btn'
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.object,
    onClick: PropTypes.func,
    className: PropTypes.string,
};

export default Button;
