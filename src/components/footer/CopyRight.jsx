import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CopyRight = ({ year }) => {
  return (
    <div className='footer-copyright'>
      <div className='container'>
        © {year} StoryBooks <br />
        All rights reserved. Design by Emmanuel Adebayo&trade;
        <Link className='grey-text text-lighten-4 right' to='#!'>
          More Links
        </Link>
      </div>
    </div>
  );
};

CopyRight.propTypes = {
  year: PropTypes.number.isRequired,
};

export default CopyRight;
