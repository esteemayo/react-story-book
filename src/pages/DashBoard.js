import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { userDashBoard } from '../services/userService';
import { deleteStory } from '../services/storyService';
import { useGlobalContext } from '../context/Context';
import Loader from '../components/Loader';
import Table from '../components/Table';

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
            const { data: stories } = await userDashBoard();
            setStories(stories);
            setLoading(false);
        } catch (err) {
            setLoading(true);
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteStory(id);
            window.location.reload();
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                toast.error('This story has already been deleted');
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
                onDelete={handleDelete}
            />
        </div>
    );
};

export default DashBoard;
