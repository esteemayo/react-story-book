import { Link } from 'react-router-dom';

const RelatedStories = ({ relatedStories, storyId }) => {
  return (
    <div className='related-stories'>
      {relatedStories && relatedStories.length > 0 && (
        <>
          {relatedStories.length > 1 && <h5>Related Stories</h5>}
          <>
            <ul className='list'>
              {relatedStories
                .filter((item) => item._id !== storyId)
                .splice(0, 3)
                .map((item) => {
                  const { _id: id, slug, title } = item;
                  return (
                    <Link
                      to={`/stories/details/${slug}`}
                      className='related-link'
                    >
                      <li key={id} className='list-items'>
                        {title}
                      </li>
                    </Link>
                  );
                })}
            </ul>
          </>
        </>
      )}
    </div>
  );
};

export default RelatedStories;
