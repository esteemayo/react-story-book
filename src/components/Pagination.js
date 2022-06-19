const Pagination = ({ counts, currentPage, numberOfPages, setCurrentPage }) => {
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
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className='pagination-btn'
            >
              Next
            </button>
          </div>
        </div>
      );
    } else if (currentPage !== numberOfPages) {
      return (
        <div className='pagination'>
          <div className='pagination-prev'>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className='pagination-btn'
            >
              Prev
            </button>
          </div>
          <div className='pagination-text'>
            <p>
              Page {currentPage} of {numberOfPages} - {counts} total results
            </p>
          </div>
          <div className='pagination-next'>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className='pagination-btn'
            >
              Next
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className='pagination'>
          <div className='pagination-prev'>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className='pagination-btn'
            >
              Prev
            </button>
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
