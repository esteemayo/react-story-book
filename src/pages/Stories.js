import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import { getStories } from '../services/storyService';
import StoryCard from '../components/StoryCard';
import Loader from '../components/Loader';

const Stories = () => {
    const [loading, setLoading] = useState(true);
    const [stories, setStories] = useState([]);
    const { search } = useLocation();

    const fetchStories = useCallback(async () => {
        const { data } = await getStories(search);
        setStories(data);
        setLoading(false);
    }, [search]);

    useEffect(() => {
        fetchStories();
    }, [search, fetchStories]);

    if (loading) {
        return (
            <main>
                <Loader />
            </main>
        );
    }

    if (stories.length < 1) {
        return <h1>There are no stories in the database.</h1>
    }

    return (
        <div className='row'>
            <h1>Stories</h1>
            {stories.map(story => {
                return <StoryCard key={story._id} {...story} />
            })}
        </div>
    );
};

export default Stories;
