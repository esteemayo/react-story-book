import { useState, useEffect } from 'react';

import { userDashBoard } from 'services/userService';
import { useGlobalContext } from 'context/Context';
import Loader from 'components/Loader';
import Table from 'components/Table';

const DashBoard = () => {
    const { user } = useGlobalContext();
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = [
        { path: 'title', label: 'Title' },
        { path: 'createdAt', label: 'Date' },
        { path: 'status', label: 'Status' },
    ];

    useEffect(() => {
        fetchStories();
    }, []);

    const fetchStories = async () => {
        try {
            const res = await userDashBoard();
            if (res.status >= 200 && res.status < 299) {
                setStories(res.data);
            } else {
                throw new Error(res.statusText);
            }
            setLoading(false);
        } catch (err) {
            setLoading(true);
            console.error(err);
        }
    };

    if (loading) {
        return (
            <main>
                <Loader />
            </main>
        );
    }

    if (stories.length === 0) {
        return <p>You have not created any stories yet</p>;
    }

    return (
        <div>
            <h1>Welcome {user?.firstName}</h1>
            <h4>Your Stories</h4>
            <Table
                data={stories}
                columns={columns}
            />
        </div>
    );
};

export default DashBoard;
