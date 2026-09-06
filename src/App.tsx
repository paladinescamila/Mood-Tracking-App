import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {useAppStore} from '@/stores/app';
import {useLoadData} from '@/hooks/useLoadData';
import './index.css';

import Login from '@/components/pages/Login';
import Signup from '@/components/pages/Signup';
import Onboarding from '@/components/pages/Onboarding';
import Dashboard from '@/components/pages/Dashboard';
import RouteAnnouncer from '@/components/atoms/RouteAnnouncer';

function App() {
	const {authUser, user} = useAppStore();

	useLoadData();

	return (
		<>
			<Router>
				<RouteAnnouncer />
				<Routes>
					<Route path='/' element={user ? <Dashboard /> : authUser ? <Onboarding /> : <Login />} />
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<Signup />} />
					<Route path='/onboarding' element={<Onboarding />} />
					<Route path='/dashboard' element={<Dashboard />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
