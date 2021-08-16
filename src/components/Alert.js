import { useEffect } from 'react';

import { useGlobalContext } from '../context/Context';

const Alert = ({ msg, type }) => {
    const { stories, hideAlert } = useGlobalContext();

    useEffect(() => {
        const timeout = setTimeout(() => {
            hideAlert();
        }, 3000);

        return () => clearTimeout(timeout);
    }, [stories, hideAlert]);

    return (
        <div className='container'>
            <div className={`toast ${type}`}>{msg}</div>
        </div>
    );
};

export default Alert;
