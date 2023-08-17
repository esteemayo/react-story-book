import { useMemo } from 'react';

import CopyRight from './CopyRight';
import FooterHead from './FooterHead';

const Footer = () => {
  const yearLabel = useMemo(() => {
    return new Date().getFullYear();
  }, []);

  return (
    <footer className='page-footer grey darken-3'>
      <FooterHead />
      <CopyRight year={yearLabel} />
    </footer>
  );
};

export default Footer;
