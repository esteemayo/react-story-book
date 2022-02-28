import { useLocation } from 'react-router';

const Error = () => {
  const { pathname } = useLocation();

  return (
    <div className='row'>
      <div className='not-found'>
        <h1>404</h1>
        <h1>error</h1>
        <h2>page not found</h2>
        <h3>
          the requested URL <span className='text-danger'>{pathname}</span> was
          not found
        </h3>
      </div>
    </div>
  );
};

export default Error;
