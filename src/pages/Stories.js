import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import { FETCH_STORIES, LOADING } from 'context/types';
import { useGlobalContext } from 'context/Context';
import { getStories } from 'services/storyService';
import StoryCard from 'components/StoryCard';
import Loader from 'components/Loader';

const Stories = () => {
    const { search } = useLocation();
    const { stories, dispatch, isLoading: loading } = useGlobalContext();

    const fetchStories = useCallback(async () => {
        dispatch({ type: LOADING });
        const { data } = await getStories(search);
        dispatch({
            type: FETCH_STORIES,
            payload: data,
        });
    }, [search, dispatch]);

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
            {stories?.map(story => {
                return <StoryCard key={story._id} {...story} />
            })}
        </div>
    );
};

export default Stories;
