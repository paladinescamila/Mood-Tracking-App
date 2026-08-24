import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './index.css';

import Login from '@/components/pages/Login';
import Signup from '@/components/pages/Signup';
import Onboarding from '@/components/pages/Onboarding';
import Dashboard from '@/components/pages/Dashboard';

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/' element={<Login />} />
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
