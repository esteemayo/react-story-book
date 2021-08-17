import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPencilAlt } from 'react-icons/fa';

import { useGlobalContext } from '../context/Context';

const StoryDetail = ({ body, slug, title, author, createdAt }) => {
    const [readMore, setReadMore] = useState(false);
    const { user } = useGlobalContext();

    return (
        <>
            <h3 className='heading-tertiary'>{title}
                {user && user.username === author && (
                    <Link to={`/stories/update/${slug}`}>
                        <small>
                            {' '}<FaPencilAlt />
                        </small>
                    </Link>
                )}
            </h3>
            <div className='card story'>
                <div className='card-content'>
                    <span className='card-title'>{new Date(createdAt).toDateString()}</span>
                    <blockquote>
                        {body && `${readMore ? body : body.split(' ').splice(0, 50).join(' ')}...`}
                        {body && body.length > 50 ? (
                            <button onClick={() => setReadMore(!readMore)} className='btn-readMore'>
                                {readMore ? 'Show less' : 'Read more'}
                            </button>
                        ) : body}
                    </blockquote>
                </div>
            </div>
        </>
    );
};

export default StoryDetail;
