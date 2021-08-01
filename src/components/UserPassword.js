import React, { useState } from 'react';
import { FaArrowAltCircleRight } from 'react-icons/fa';

import { updateUserPassword } from '../services/userService';
import { useGlobalContext } from '../context/Context';
import Button from './Button';
import Input from './Input';
import Title from './Title';

const UserPassword = () => {
    const { loginSuccess } = useGlobalContext();
    const [errors, setErrors] = useState({});
    const [password, setPassword] = useState('');
    const [passwordCurrent, setPasswordCurrent] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const validateForm = () => {
        const tempErrors = {};

        if (password === '') {
            tempErrors.password = 'Password field is required.';
        }

        if (passwordCurrent === '') {
            tempErrors.passwordCurrent = 'Current password field is required.';
        }

        if (passwordConfirm === '') {
            tempErrors.passwordConfirm = 'Confirm password field is required.';
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

        try {
            const userData = {
                password,
                passwordCurrent,
                passwordConfirm,
            };

            const { data } = await updateUserPassword(userData);
            loginSuccess(data);
            window.location.reload();
        } catch (ex) {
            console.log(ex.response.data.message);
            if (ex.response && ex.response.status === 400) {
                const tempErrors = { ...errors };
                tempErrors.passwordCurrent = ex.response.data.message;
                setErrors(tempErrors);
            } else if (ex.response && ex.response.status === 500) {
                const tempErrors = { ...errors };
                tempErrors.password = ex.response.data.message.slice(41);
                tempErrors.passwordConfirm = ex.response.data.message.slice(41);
                setErrors(tempErrors);
            }
        }
    };

    return (
        <div className='user-password'>
            <Title
                title='Password change'
                className='text-uppercase'
            />
            <hr />
            <form onSubmit={handleSubmit}>
                <Input
                    type='password'
                    name='passwordCurrent'
                    placeholder='********'
                    label='Current Password'
                    autoComplete='true'
                    error={errors.passwordCurrent}
                    onChange={e => setPasswordCurrent(e.target.value)}
                />
                <Input
                    type='password'
                    name='password'
                    label='Password'
                    placeholder='********'
                    autoComplete='true'
                    onChange={e => setPassword(e.target.value)}
                    error={errors.password}
                />
                <Input
                    type='password'
                    name='passwordConfirm'
                    placeholder='********'
                    label='Confirm Password'
                    autoComplete='true'
                    error={errors.passwordConfirm}
                    onChange={e => setPasswordConfirm(e.target.value)}
                />
                <Button
                    text='Save password'
                    icon={<FaArrowAltCircleRight style={iconStyling} />}
                />
            </form>
        </div>
    );
};

const iconStyling = {
    fontSize: '0.8rem',
};

export default UserPassword;
