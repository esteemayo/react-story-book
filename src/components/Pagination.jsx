import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Pagination = ({ counts, currentPage, numberOfPages }) => {
  const renderPagination = () => {
    if (currentPage === numberOfPages && currentPage === 1) return null;
    if (currentPage === 1) {
      return (
        <div className='pagination'>
          <div className='pagination-text'>
            <p>
              Page {currentPage} of {numberOfPages} - {counts} total results
            </p>
          </div>
          <div className='pagination-next'>
            <Link
              to={`/stories?page=${currentPage + 1}`}
              className='pagination-btn'
            >
              Next
            </Link>
          </div>
        </div>
      );
    } else if (currentPage !== numberOfPages) {
      return (
        <div className='pagination'>
          <div className='pagination-prev'>
            <Link
              to={`/stories?page=${currentPage - 1}`}
              className='pagination-btn'
            >
              Prev
            </Link>
          </div>
          <div className='pagination-text'>
            <p>
              Page {currentPage} of {numberOfPages} - {counts} total results
            </p>
          </div>
          <div className='pagination-next'>
            <Link
              to={`/stories?page=${currentPage + 1}`}
              className='pagination-btn'
            >
              Next
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className='pagination'>
          <div className='pagination-prev'>
            <Link
              to={`/stories?page=${currentPage - 1}`}
              className='pagination-btn'
            >
              Prev
            </Link>
          </div>
          <div className='pagination-text'>
            <p>
              Page {currentPage} of {numberOfPages} - {counts} total results
            </p>
          </div>
        </div>
      );
    }
  };

  return renderPagination();
};

export default Pagination;
