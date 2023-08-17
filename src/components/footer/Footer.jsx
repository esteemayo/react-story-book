import { useMemo } from 'react';

import MenuItems from './MenuItems';
import CopyRight from './CopyRight';

const Footer = () => {
  const year = useMemo(() => {
    return new Date().getFullYear();
  }, []);

  return (
    <footer className='page-footer grey darken-3'>
      <div className='container'>
        <div className='row'>
          <div className='col l6 s12'>
            <h5 className='white-text'>StoryBooks</h5>
            <p className='grey-text text-lighten-4'>
              Share your life with the world
            </p>
          </div>
          <MenuItems />
        </div>
      </div>
      <CopyRight year={year} />
    </footer>
  );
};

export default Footer;
