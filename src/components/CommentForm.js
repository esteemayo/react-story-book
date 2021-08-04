import { useState } from 'react';
import { Link } from 'react-router-dom';

import { createComment } from '../services/commentService';
import { useGlobalContext } from '../context/Context';
import TextArea from './TextArea';
import Button from './Button';

const CommentForm = ({ id }) => {
    const { user } = useGlobalContext();
    const [body, setBody] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const commentData = { body }
            await createComment(id, commentData);
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
        <div className='card'>
            <div className='card-content'>
                <span className='card-title'>Comments</span>
                {user ? (
                    <form onSubmit={handleSubmit}>
                        <TextArea
                            name='body'
                            label='Add Comment'
                            onChange={e => setBody(e.target.value)}
                        />
                        <Button
                            text='Submit'
                            className='btn'
                            disabled={body.trim() === ''}
                        />
                    </form>
                ) : (
                    <p>Please <Link to='/login'>log</Link> in to leave a comment</p>
                )}
            </div>
        </div>
    );
};

export default CommentForm;
