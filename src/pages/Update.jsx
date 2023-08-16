import { useState, useEffect, useCallback } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

import Input from 'components/input/Input';
import TextArea from 'components/input/TextArea';
import Button from 'components/button/Button';

import { useGlobalContext } from 'context/story/StoryContext';
import { getWithSlug, updateStory } from 'services/storyService';

const Update = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const path = pathname.split('/')[3];
  const { editStory } = useGlobalContext();

  const [id, setId] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState('');
  const [tags, setTags] = useState([]);
  const [allowComments, setAllowComments] = useState(true);
  const [errors, setErrors] = useState({});

  const fetchStory = useCallback(async () => {
    const { data: story } = await getWithSlug(path);

    setId(story._id);
    setBody(story.body);
    setTags(story.tags);
    setTitle(story.title);
    setStatus(story.status);
    setAllowComments(story.allowComments);
  }, [path]);

  useEffect(() => {
    fetchStory();
  }, [path, fetchStory]);

  const validateForm = useCallback(() => {
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

    if (!tags.length) {
      tempErrors.tags = 'Please provide some tags';
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return false;
    }

    return true;
  }, [title, body, status, tags]);

  const handleUpdate = useCallback(async () => {
    try {
      const updStory = {
        body,
        tags,
        title,
        status,
        allowComments,
      };

      const { data: story } = await updateStory(id, { ...updStory });
      editStory(id, story);
    } catch (ex) {
      console.error(ex);
    }
  },
    [
      allowComments,
      body,
      id,
      status,
      tags,
      title,
      editStory,
    ]
  );

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setErrors({});

    await handleUpdate();
    await navigate('/dashboard');
  }, [handleUpdate, validateForm, navigate]);

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
              onChange={(e) => setTitle(e.target.value)}
              error={errors.title}
            />
            <Input
              type='text'
              name='status'
              label='Status'
              value={status}
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
              value={body}
              label='Tell Us Your Story'
              onChange={(e) => setBody(e.target.value)}
              error={errors.body}
            />
            <Input
              type='text'
              name='tags'
              label='Tags'
              value={tags}
              onChange={(e) => setTags(e.target.value.split(','))}
              error={errors.tags}
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
