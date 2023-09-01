import Moment from 'react-moment';
import PropTypes from 'prop-types';

const DateTime = ({ date }) => {
  return (
    <Moment format='MMMM Do YYYY'>
      {date}
    </Moment>
  );
};

export default DateTime;
