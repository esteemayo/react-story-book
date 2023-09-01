import Moment from 'react-moment';
import PropTypes from 'prop-types';

const DateTime = ({ date }) => {
  return (
    <Moment format='MMMM Do YYYY'>
      {date}
    </Moment>
  );
};

DateTime.propTypes = {
  date: PropTypes.string.isRequired,
};

export default DateTime;
