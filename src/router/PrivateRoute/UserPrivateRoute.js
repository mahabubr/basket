import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import useAuth from '../../hooks/useAuth';

const UserPrivateRoute = ({ children }) => {

    const { user, loading } = useAuth()

    const location = useLocation()

    if (loading) {
        return <Loader />
    }

    if (user) {
        return children
    }

    return <Navigate to="/login" state={{ from: location }} replace />

};

export default UserPrivateRoute;