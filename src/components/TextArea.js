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

export default TextArea;
