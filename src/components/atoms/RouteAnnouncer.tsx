import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

export default function RouteAnnouncer() {
	const location = useLocation();

	useEffect(() => {
		document.getElementById('page-main')?.focus();
	}, [location.pathname]);

	const pageName =
		location.pathname === '/dashboard'
			? 'Dashboard'
			: location.pathname === '/signup'
				? 'Sign up'
				: location.pathname === '/onboarding'
					? 'Onboarding'
					: location.pathname === '/'
						? 'Mood tracker'
						: 'Log in';

	return (
		<div className='sr-only' aria-live='polite' aria-atomic='true'>
			{pageName} page loaded
		</div>
	);
}
