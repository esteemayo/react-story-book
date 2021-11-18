import { useState, useEffect, useRef } from 'react';

import { useGlobalContext } from 'context/Context';
import { loginUser } from 'services/userService';
import { Spinner } from 'components';

const Login = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [errors, setErrors] = useState({});
    const { dispatch, isLoading, loginSuccess, loginFailure } = useGlobalContext();

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    const validateForm = () => {
        const errors = {};

        if (emailRef.current.value.trim() === '') {
            errors.email = 'Please provide your email';
        }

        if (passwordRef.current.value.trim() === '') {
            errors.password = 'Please provide a password';
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            loginFailure();
            return false
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: 'LOGIN_START' });

        if (!validateForm()) return;
        setErrors({});

        try {
            const userData = {
                email: emailRef.current.value,
                password: passwordRef.current.value,
            };

            const { data } = await loginUser(userData);
            loginSuccess(data);
            window.location.replace('/stories');
        } catch (err) {
            if (err.response && err.response.status === 401) {
                const tempErrors = { ...errors };
                tempErrors.email = err.response.data.message;
                tempErrors.password = err.response.data.message;
                setErrors(tempErrors);
                loginFailure();
            }
        }
    };

    return (
        <main className='main'>
            <div className='login-form'>
                <h2 className='heading-secondary ma-bt-lg'>Login into your account</h2>
                <form onSubmit={handleSubmit} className='form'>
                    <div className='row'>
                        <div className='input-field'>
                            <label htmlFor='email'>Email Address</label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                placeholder='you@example.com'
                                ref={emailRef}
                            />
                            {errors && <div className='alert alert-danger'>{errors.email}</div>}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='input-field'>
                            <label htmlFor='password'>Password</label>
                            <input
                                type='password'
                                id='password'
                                name='password'
                                placeholder='********'
                                ref={passwordRef}
                            />
                            {errors && <div className='alert alert-danger'>{errors.password}</div>}
                        </div>
                    </div>
                    <button type='submit' className='btn loginButton'>
                        {isLoading ? <Spinner /> : 'Login'}
                    </button>
                </form>
            </div>
        </main>
    );
};

export default Login;
