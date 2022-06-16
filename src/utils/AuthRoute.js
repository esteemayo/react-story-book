import { useGlobalContext } from 'context/Context';
import LoadingToRedirect from './LoadingToRedirect';

const AuthRoute = ({ children }) => {
  const { user } = useGlobalContext();

  return user ? children : <LoadingToRedirect />;
};

export default AuthRoute;
