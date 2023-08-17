import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useGlobalContext } from 'context/story/StoryContext';

const Alert = ({ msg, type }) => {
  const { stories, hideAlert } = useGlobalContext();

  useEffect(() => {
    const timeout = setTimeout(() => {
      hideAlert();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [stories, hideAlert]);

  return (
    <div className='container'>
      <div className={`toast ${type}`}>{msg}</div>
    </div>
  );
};

Alert.propTypes = {
  msg: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Alert;
