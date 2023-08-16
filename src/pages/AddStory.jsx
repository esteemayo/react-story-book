import { useCallback, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import Input from 'components/Input';
import TextArea from 'components/TextArea';
import Button from 'components/Button';

import { createStory } from 'services/storyService';
import { useGlobalContext } from 'context/story/StoryContext';

const AddStory = () => {
  const navigate = useNavigate();
  const { addStory } = useGlobalContext();

  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});
  const [allowComments, setAllowComments] = useState(true);

  const validateForm = useCallback(() => {
    const tempErrors = {};

    if (title.trim() === '') {
      tempErrors.title = 'A story must have a title';
    }

    if (body.trim() === '') {
      tempErrors.body = 'A story must have a body';
    }

    if (!tags.length) {
      tempErrors.tags = 'Please provide some tags';
    }

    if (status.trim() === '') {
      tempErrors.status = 'A story must have a status';
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return false;
    }
    return true;
  }, [title, body, status, tags]);

  const handleCreate = useCallback(async () => {
    try {
      const newStory = {
        body,
        tags,
        title,
        status,
        allowComments,
      };

      const { data: story } = await createStory({ ...newStory });
      addStory(story);
      navigate(`/stories/details/${story.slug}`);
    } catch (ex) {
      console.error(ex);
    }
  },
    [
      title,
      body,
      status,
      tags,
      allowComments,
      addStory,
      navigate,
    ]
  );

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setErrors({});

    await handleCreate();
  }, [validateForm, handleCreate]);

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
              onChange={(e) => setTitle(e.target.value)}
              error={errors.title}
            />
            <Input
              type='text'
              name='status'
              label='Status'
              placeholder='status can either be: public, private, unpublished'
              onChange={(e) => setStatus(e.target.value)}
              error={errors.status}
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
                    onChange={(e) => setAllowComments(e.currentTarget.checked)}
                  />
                  <span>Allow Comments</span>
                </label>
              </p>
            </div>
            <TextArea
              name='body'
              label='Tell Us Your Story'
              className='materialize-textarea'
              onChange={(e) => setBody(e.target.value)}
              error={errors.body}
            />
            <Input
              type='text'
              name='tags'
              label='Tags'
              placeholder='Tags'
              onChange={(e) => setTags(e.target.value.split(','))}
              error={errors.tags}
            />
            <Button
              text='Save'
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

export default AddStory;
