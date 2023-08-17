import PropTypes from 'prop-types';

const TextArea = ({ name, label, error, ...rest }) => {
  return (
    <div className='input-field'>
      <textarea
        {...rest}
        name={name}
        id={name}
        className='materialize-textarea'
      ></textarea>
      <label htmlFor={name}>{label}</label>
      {error && <div className='alert alert-danger'>{error}</div>}
    </div>
  );
};

TextArea.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  rest: PropTypes.any,
};

export default TextArea;
