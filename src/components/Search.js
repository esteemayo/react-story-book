import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { searchStory } from 'services/storyService';
import { useGlobalContext } from 'context/story/StoryContext';
import { HIDE_LOADING, LOADING, SEARCH_STORY } from 'context/story/StoryTypes';

const Search = () => {
  const navigate = useNavigate();
  const { dispatch } = useGlobalContext();
  const [search, setSearch] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();

    if (search) {
      dispatch({ type: LOADING });
      try {
        const { data } = await searchStory(search);
        dispatch({
          type: SEARCH_STORY,
          payload: data,
        });
        dispatch({ type: HIDE_LOADING });
        navigate(`/stories/search?q=${search}`);
        setSearch('');
      } catch (err) {
        console.log(err);
      }
    } else {
      navigate('/stories');
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <div className='form-group'>
        <input
          type='search'
          className='form-input'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className='search-icon-container'>
          <FaSearch className='search-icon' />
        </div>
      </div>
    </form>
  );
};

export default Search;
