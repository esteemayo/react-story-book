import LoadingToRedirect from './LoadingToRedirect';
import { useGlobalAuthContext } from 'context/auth/AuthContext';

const AuthRoute = ({ children }) => {
  const { user } = useGlobalAuthContext();

  return user ? children : <LoadingToRedirect />;
};

export default AuthRoute;
