import PropTypes from 'prop-types';

const Title = ({ title, className }) => {
  return <h2 className={className}>{title}</h2>;
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default Title;
