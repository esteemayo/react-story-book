import PropTypes from 'prop-types';
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
                      key={id}
                      to={`/stories/details/${slug}`}
                      className='related-link'
                    >
                      <li className='list-items'>{title}</li>
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

RelatedStories.propTypes = {
  relatedStories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
  storyId: PropTypes.string.isRequired,
};

export default RelatedStories;
