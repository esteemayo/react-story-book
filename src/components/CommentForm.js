import { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from './Button';
import TextArea from './TextArea';
import { createComment } from 'services/commentService';
import { useGlobalAuthContext } from 'context/auth/AuthContext';

const CommentForm = ({ id }) => {
  const { user } = useGlobalAuthContext();

  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

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
  };

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
              disabled={body.trim() === ''}
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

export default CommentForm;
