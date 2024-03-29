import { useCallback, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { searchStory } from 'services/storyService';
import { useGlobalContext } from 'context/story/StoryContext';

const Search = () => {
  const navigate = useNavigate();
  const { findStory, showLoading, hideLoading } = useGlobalContext();

  const [search, setSearch] = useState('');

  const handleSearchStory = useCallback(async () => {
    showLoading();
    try {
      const { data } = await searchStory(search);
      findStory(data);
      hideLoading();
      setSearch('');
    } catch (err) {
      console.log(err);
    }
  }, [findStory, hideLoading, search, showLoading]);

  const handleSearch = useCallback(async (e) => {
    e.preventDefault();

    if (search) {
      await handleSearchStory();
      await navigate(`/stories/search?q=${search}`);
    } else {
      navigate('/stories');
    }
  }, [handleSearchStory, navigate, search]);

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
