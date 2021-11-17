import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

import { createStory } from 'services/storyService';
import { useGlobalContext } from 'context/Context';
import TextArea from 'components/TextArea';
import Button from 'components/Button';
import Input from 'components/Input';

const AddStory = () => {
    const [body, setBody] = useState('');
    const [title, setTitle] = useState('');
    const { addStory } = useGlobalContext();
    const [status, setStatus] = useState('');
    const [errors, setErrrors] = useState({});
    const [allowComments, setAllowComments] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newStory = {
                body,
                title,
                status,
                allowComments,
            };

            const { data: story } = await createStory(newStory);
            addStory(story);
            window.location.replace(`/stories/details/${story.slug}`);
        } catch (ex) {
            console.log(ex.response.data.message);
            if (ex.response && ex.response.status === 500) {
                const tempErrors = { ...errors };
                tempErrors.title = ex.response.data.message.slice(63, 89);
                tempErrors.body = ex.response.data.message.slice(31, 55);
                setErrrors(tempErrors);
            }
        }
    };

    return (
        <div className='row'>
            <main className='main'>
                <div className='story-form'>
                    <h1 className='heading-secondary'>Add Story</h1>
                    <form onSubmit={handleSubmit}>
                        <Input
                            type='text'
                            name='title'
                            label='Title'
                            autoFocus
                            onChange={e => setTitle(e.target.value)}
                            error={errors.title}
                        />
                        <Input
                            type='text'
                            name='status'
                            label='Status'
                            placeholder='status can only be: public, private, unpublished'
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
                            label='Tell Us Your Story'
                            className='materialize-textarea'
                            onChange={e => setBody(e.target.value)}
                            error={errors.body}
                        />
                        <Button
                            text='Save'
                            className='btn'
                            icon={<FaArrowRight style={iconStyling} />}
                        />
                    </form>
                </div>
            </main>
        </div>
    );
};

const iconStyling = {
    fontSize: '0.8rem',
};

export default AddStory;
