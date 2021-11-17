import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

import { getWithSlug, updateStory } from 'services/storyService';
import { useGlobalContext } from 'context/Context';
import { UPDATE_STORY } from 'context/types';
import TextArea from 'components/TextArea';
import Button from 'components/Button';
import Input from 'components/Input';

const Update = () => {
    const { pathname } = useLocation();
    const path = pathname.split('/')[3];
    const { dispatch } = useGlobalContext();

    const [id, setId] = useState(null);
    const [body, setBody] = useState('');
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [errors, setErrrors] = useState({});
    const [allowComments, setAllowComments] = useState(true);

    const fetchStory = useCallback(async () => {
        const { data: story } = await getWithSlug(path);

        setId(story._id);
        setBody(story.body);
        setTitle(story.title);
        setStatus(story.status);
        setAllowComments(story.allowComments);
    }, [path]);

    useEffect(() => {
        fetchStory();
    }, [path, fetchStory]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updStory = {
                body,
                title,
                status,
                allowComments,
            };

            await updateStory(id, updStory);
            dispatch({ type: UPDATE_STORY });
            window.location.replace('/dashboard');
        } catch (ex) {
            if (ex.response && ex.response.status === 500) {
                const tempErrors = { ...errors };
                tempErrors.title = ex.response.data.message.slice(58, 89);
                tempErrors.body = ex.response.data.message.slice(25, 49);
                setErrrors(tempErrors);
            }
        }
    };

    return (
        <div className='row'>
            <main className='main'>
                <div className='story-form'>
                    <h1 className='heading-secondary'>Update Story</h1>
                    <form onSubmit={handleSubmit}>
                        <Input
                            type='text'
                            name='title'
                            label='Title'
                            autoFocus
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            error={errors.title}
                        />
                        <Input
                            type='text'
                            name='status'
                            label='Status'
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                        />
                        <div className='row'>
                            <p>
                                <label htmlFor='filled-in-box'>
                                    <input
                                        id='filled-in-box'
                                        type='checkbox'
                                        name='allowComments'
                                        className='filled-in'
                                        checked={allowComments}
                                        onChange={e => setAllowComments(e.currentTarget.checked)}
                                    />
                                    <span>Allow Comments</span>
                                </label>
                            </p>
                        </div>
                        <TextArea
                            name='body'
                            value={body}
                            label='Tell Us Your Story'
                            onChange={e => setBody(e.target.value)}
                            error={errors.body}
                        />

                        <Button
                            text='Update'
                            className='btn'
                            icon={<FaArrowRight style={iconStyle} />}
                        />
                    </form>
                </div>
            </main>
        </div>
    );
};

const iconStyle = {
    fontSize: '0.8rem',
};

export default Update;
