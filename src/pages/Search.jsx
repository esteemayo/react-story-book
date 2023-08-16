import { useQuery } from 'utils';
import { useGlobalContext } from 'context/story/StoryContext';
import StoryCard from 'components/story/StoryCard';

const Search = () => {
  const { stories } = useGlobalContext();

  const query = useQuery();
  const searchQuery = query.get('q');

  if (stories.length === 0 && searchQuery) {
    return (
      <div className='container error-wrapper'>
        <h1 className='story-error-msg'>
          We couldn't find any matches for "{searchQuery}"
        </h1>
      </div>
    );
  }

  return (
    <div className='container'>
      <div className='row'>
        <h1>Stories</h1>
        {stories?.map((story) => {
          return <StoryCard key={story._id} {...story} />;
        })}
      </div>
    </div>
  );
};

export default Search;
