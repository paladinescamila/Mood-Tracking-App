import {useEffect} from 'react';
import {useAppStore} from '@/stores/app';
import {auth} from '@/firebase/config';
import {getUser, getUserMoods} from '@/firebase/firestore';

export const useLoadData = () => {
	const {setAuthUser, setUser, setMoodsHistory} = useAppStore();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
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
		});

		return () => unsubscribe();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};
