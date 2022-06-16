import PropTypes from 'prop-types';

const About = ({ title }) => {
  return (
    <div className='container'>
      <h1>{title}</h1>
      <p>Version 1.0.0</p>
      <p>StoryBooks is an app to share your life</p>
    </div>
  );
};

About.defaultProps = {
  title: 'About',
};

About.propTypes = {
  title: PropTypes.string.isRequired,
};

export default About;
