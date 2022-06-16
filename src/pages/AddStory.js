import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

import Input from 'components/Input';
import Button from 'components/Button';
import TextArea from 'components/TextArea';
import { useGlobalContext } from 'context/Context';
import { createStory } from 'services/storyService';

const AddStory = () => {
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const { addStory } = useGlobalContext();
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});
  const [allowComments, setAllowComments] = useState(true);

  const validateForm = () => {
    const tempErrors = {};

    if (title.trim() === '') {
      tempErrors.title = 'A story must have a title';
    }

    if (body.trim() === '') {
      tempErrors.body = 'A story must have a body';
    }

    if (status.trim() === '') {
      tempErrors.status = 'A story must have a status';
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setErrors({});

    try {
      const newStory = { body, title, status, allowComments };

      const { data: story } = await createStory({ ...newStory });
      addStory(story);
      // window.location.replace(`/stories/details/${story.slug}`);
    } catch (ex) {
      console.error(ex);
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
