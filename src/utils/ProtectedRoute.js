import { Route, Redirect } from 'react-router-dom';
import { useGlobalContext } from 'context/Context';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { user } = useGlobalContext();

    return (
        <Route
            {...rest}
            render={props =>
                user ? <Component {...props} /> : <Redirect to='/login' />
            }
        />
    );
};

export default ProtectedRoute;
