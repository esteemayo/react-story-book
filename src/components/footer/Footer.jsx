import { useMemo } from 'react';

import CopyRight from './CopyRight';
import FooterHead from './FooterHead';

const Footer = () => {
  const year = useMemo(() => {
    return new Date().getFullYear();
  }, []);

  return (
    <footer className='page-footer grey darken-3'>
      <FooterHead />
      <CopyRight year={year} />
    </footer>
  );
};

export default Footer;
