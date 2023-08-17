import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import MenuItems from './MenuItems';

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
          <div className='col l4 offset-l2 s12'>
            <h5 className='white-text'>Links</h5>
            <MenuItems />
          </div>
        </div>
      </div>
      <div className='footer-copyright'>
        <div className='container'>
          © {year} StoryBooks <br />
          All rights reserved. Design by Emmanuel Adebayo&trade;
          <Link className='grey-text text-lighten-4 right' to='#!'>
            More Links
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
