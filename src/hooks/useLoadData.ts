import {useEffect, useState} from 'react';
import {useAppStore} from '@/stores/app';
import {auth} from '@/firebase/config';
import {getUser, getUserMoods} from '@/firebase/firestore';
import {signIn} from '@/firebase/auth';

export const useLoadData = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const {setAuthUser, setUser, setMoodsHistory} = useAppStore();

	// Load all user data (user info and moods history)
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
			setError(null);

			try {
				if (authUser) {
					setAuthUser(authUser);

					const userDoc = await getUser(authUser.uid);

					if (userDoc) {
						setUser(userDoc);
						const moodsHistory = await getUserMoods(authUser.uid);
						setMoodsHistory(moodsHistory);
					}
				} else {
					setAuthUser(null);
					setUser(null);
					setMoodsHistory([]);
				}
			} catch (loadError) {
				console.error('Error loading user data:', loadError);
				setError('Unable to load your account data. Please try again.');
			} finally {
				setLoading(false);
			}
		});

		return () => unsubscribe();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Log in the sample user only on the first load of the app
	useEffect(() => {
		const loginSampleUser = async () => {
			const isFirstLoad = JSON.parse(localStorage.getItem('is-first-load') || 'true');

			if (!isFirstLoad) return;

			try {
				const SAMPLE_USER_EMAIL = 'lisa@mail.com';
				const SAMPLE_USER_PASSWORD = import.meta.env.VITE_SAMPLE_USER_PASSWORD;

				await signIn(SAMPLE_USER_EMAIL, SAMPLE_USER_PASSWORD);
			} catch (error) {
				console.error('Error logging in sample user:', error);
			}

			localStorage.setItem('is-first-load', 'false');
		};

		loginSampleUser();
	}, []);

	return {loading, error};
};
