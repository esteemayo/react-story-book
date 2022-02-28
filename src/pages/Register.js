import { v4 } from 'uuid';
import { useState } from 'react';

import { uploadPhoto } from 'services/uploadService';
import { useGlobalContext } from 'context/Context';
import { createUser } from 'services/userService';
import { Input, Spinner } from 'components';

const Register = () => {
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { dispatch, isLoading, loginSuccess, loginFailure } =
    useGlobalContext();

  const validateForm = () => {
    const errors = {};

    if (name.trim() === '') {
      errors.name = 'Please tell us your name.';
    }

    if (email.trim() === '') {
      errors.email = 'Please provide your email address.';
    }

    if (username.trim() === '') {
      errors.username = 'Please tell us your username.';
    }

    if (password === '') {
      errors.password = 'Please provide a password.';
    }

    if (password.length < 8 || passwordConfirm.length < 8) {
      errors.password = 'Password must not be less than 8 characters';
      errors.passwordConfirm = 'Password must not be less than 8 characters';
    }

    if (passwordConfirm === '') {
      errors.passwordConfirm = 'Please confirm your password.';
    }

    if (password !== passwordConfirm) {
      errors.passwordConfirm = 'Passwords are not the same.';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      loginFailure();
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });

    if (!validateForm()) return;
    setErrors({});

    const newUser = {
      name,
      email,
      username,
      password,
      passwordConfirm,
    };

    if (file) {
      const data = new FormData();
      const filename = v4() + file.name;
      data.append('name', filename);
      data.append('file', file);
      newUser.photo = filename;
      try {
        await uploadPhoto(data);
      } catch (err) {
        console.error(err);
      }
    }

    try {
      const { data: user } = await createUser(newUser);
      loginSuccess(user);
      window.location.replace('/stories');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const tempErrors = { ...errors };
        tempErrors.username = 'Username already exists. Try another one';
        setErrors(tempErrors);
        loginFailure();
      }
    }
  };

  return (
    <main className='main'>
      <div className='register-form'>
        <h2 className='heading-secondary ma-bt-lg'>Register Page</h2>
        <form onSubmit={handleSubmit} className='form'>
          <Input
            type='text'
            name='name'
            label='Name'
            autoFocus
            placeholder='Enter your name'
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
          />
          <Input
            type='email'
            name='email'
            label='Email Address'
            placeholder='you@example.com'
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          <Input
            type='text'
            name='username'
            label='Username'
            placeholder='username'
            onChange={(e) => setUsername(e.target.value)}
            error={errors.username}
          />
          <Input
            type='password'
            name='password'
            label='Password'
            placeholder='********'
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
          <Input
            type='password'
            name='passwordConfirm'
            placeholder='********'
            label='Confirm Password'
            onChange={(e) => setPasswordConfirm(e.target.value)}
            error={errors.passwordConfirm}
          />
          {file && (
            <img
              src={file ? URL.createObjectURL(file) : null}
              className='form__user-photo'
              alt=''
            />
          )}
          <Input
            type='file'
            name='photo'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button type='submit' className='btn registerButton'>
            {isLoading ? <Spinner /> : 'Register'}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Register;
