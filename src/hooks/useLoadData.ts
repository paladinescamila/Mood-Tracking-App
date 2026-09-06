import {useEffect, useState} from 'react';
import {useAppStore} from '@/stores/app';
import {auth} from '@/firebase/config';
import {getUser, getUserMoods} from '@/firebase/firestore';

export const useLoadData = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const {setAuthUser, setUser, setMoodsHistory} = useAppStore();

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

	return {loading, error};
};
