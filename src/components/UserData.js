import { v4 } from 'uuid';
import { useState } from 'react';
import { FaArrowAltCircleRight } from 'react-icons/fa';

import Input from './Input';
import Title from './Title';
import Button from './Button';
import { uploadPhoto } from 'services/uploadService';
import { useGlobalAuthContext } from 'context/auth/AuthContext';
import axios from 'axios';

const devEnv = process.env.NODE_ENV !== 'production';
const { REACT_APP_DEV_API_URL, REACT_APP_PROD_API_URL } = process.env;

const UserData = () => {
  const { user, loginSuccess } = useGlobalAuthContext();

  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [username, setUsername] = useState('');

  const validateForm = () => {
    const tempErrors = {};

    if (name.trim() === '') {
      tempErrors.name = 'Please tell us your name';
    }

    if (email.trim() === '') {
      tempErrors.email = 'Please provide your password';
    }

    if (username.trim() === '') {
      tempErrors.username = 'Please tell us your username';
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

    const userData = {
      name,
      email,
      username,
    };

    if (file) {
      const data = new FormData();
      const filename = v4() + file.name;
      data.append('name', filename);
      data.append('file', file);
      userData.photo = filename;
      try {
        await uploadPhoto(data);
      } catch (err) {
        console.error(err);
      }
    }

    try {
      const { data: user } = await axios.patch(
        `${
          devEnv ? REACT_APP_DEV_API_URL : REACT_APP_PROD_API_URL
        }/users/update-me`,
        { ...userData }
      );
      loginSuccess(user);
      window.location.reload();
    } catch (ex) {
      console.error(ex.response.data.message);
    }
  };

  return (
    <div>
      <Title title='Your account settings' className='text-uppercase' />
      <hr />
      <form onSubmit={handleSubmit}>
        <Input
          name='name'
          placeholder={user.name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />
        <Input
          name='email'
          placeholder={user.email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <Input
          name='username'
          placeholder={user.username}
          onChange={(e) => setUsername(e.target.value)}
          error={errors.username}
        />
        <Input
          name='file'
          type='file'
          onChange={(e) => setFile(e.target.files[0])}
        />
        <Button
          text='Save settings'
          icon={<FaArrowAltCircleRight style={iconStyle} />}
        />
      </form>
    </div>
  );
};

const iconStyle = {
  fontSize: '0.8rem',
};

export default UserData;
