import { Navigate } from 'react-router-dom';
import { useGlobalContext } from 'context/Context';

const ProtectedRoute = ({ children }) => {
  const { user } = useGlobalContext();

  return user ? <Navigate to='/' /> : children;
};

export default ProtectedRoute;
