import { Link } from 'react-router-dom';
import { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { createComment } from 'services/commentService';
import { useGlobalAuthContext } from 'context/auth/AuthContext';

import Button from '../button/Button';
import TextArea from '../input/TextArea';

const CommentForm = ({ id }) => {
  const { user } = useGlobalAuthContext();

  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({});

  const handleComment = useCallback(async () => {
    try {
      const commentData = { body };
      await createComment(id, { ...commentData });
      window.location.reload();
    } catch (err) {
      if (err.response && err.response.status === 500) {
        const tempErrors = { ...errors };
        tempErrors.body = err.response.data.message.slice(33);
        setErrors(tempErrors);
      }
    }
  }, [id, body, errors]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    await handleComment();
  }, [handleComment]);

  const disableBtn = useMemo(() => {
    return !!body.trim() === '';
  }, [body]);

  return (
    <div className='card single-story-card'>
      <div className='card-content'>
        <span className='card-title'>Comments</span>
        {user ? (
          <form onSubmit={handleSubmit}>
            <TextArea
              name='body'
              label='Add Comment'
              onChange={(e) => setBody(e.target.value)}
            />
            <Button
              text='Submit'
              className='btn'
              disabled={disableBtn}
            />
          </form>
        ) : (
          <p>
            Please <Link to='/login'>log</Link> in to leave a comment
          </p>
        )}
      </div>
    </div>
  );
};

CommentForm.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CommentForm;
