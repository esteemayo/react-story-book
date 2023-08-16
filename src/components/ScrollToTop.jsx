import { FaArrowAltCircleUp } from 'react-icons/fa';
import { useCallback, useEffect, useState } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(window.scrollY > 250 ? true : false);
  };

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

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
