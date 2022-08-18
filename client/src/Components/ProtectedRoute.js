import { Navigate } from 'react-router-dom';

const ProtectetdRoute = ( { children, user }) => {
	if(!user) {
		return <Navigate to='/' />;
	}
	return children;
}

export default ProtectetdRoute;