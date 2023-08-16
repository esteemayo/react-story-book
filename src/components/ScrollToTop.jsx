import { useEffect, useState } from 'react';
import { FaArrowAltCircleUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(window.pageYOffset > 250 ? true : false);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    document.addEventListener('scroll', toggleVisibility);

    return () => document.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className='scroll'>
      {isVisible && (
        <div className='scroll-icon' onClick={handleScrollToTop}>
          <FaArrowAltCircleUp />
        </div>
      )}
    </div>
  );
};

export default ScrollToTop;
