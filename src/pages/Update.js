import { FaArrowRight } from 'react-icons/fa';
import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Input from 'components/Input';
import Button from 'components/Button';
import TextArea from 'components/TextArea';
import { UPDATE_STORY } from 'context/story/StoryTypes';
import { useGlobalContext } from 'context/story/StoryContext';
import { getWithSlug, updateStory } from 'services/storyService';

const Update = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const path = pathname.split('/')[3];
  const { dispatch } = useGlobalContext();

  const [id, setId] = useState(null);
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});
  const [allowComments, setAllowComments] = useState(true);

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

    if (!tags.length) {
      tempErrors.tags = 'Please provide some tags';
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
      const updStory = {
        body,
        tags,
        title,
        status,
        allowComments,
      };

      const { data: story } = await updateStory(id, { ...updStory });

      dispatch({
        type: UPDATE_STORY,
        payload: {
          id,
          story,
        },
      });

      navigate('/dashboard');
    } catch (ex) {
      console.error(ex);
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
