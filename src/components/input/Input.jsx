import PropTypes from 'prop-types';

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className='row'>
      <div className='input-field'>
        <label htmlFor={name}>{label}</label>
        <input {...rest} id={name} name={name} />
        {error && <div className='alert alert-danger'>{error}</div>}
      </div>
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  rest: PropTypes.any,
};

export default Input;
