import Moment from 'react-moment';

const DateTime = ({ date }) => {
  return (
    <Moment format='MMMM Do YYYY'>
      {date}
    </Moment>
  );
};

export default DateTime;
