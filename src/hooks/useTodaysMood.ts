import {useMemo} from 'react';
import {useAppStore} from '@/stores/app';

export const useTodaysMood = () => {
	const {moodsHistory} = useAppStore();

	const todaysMood = useMemo(() => {
		const today = new Date().toISOString().split('T')[0];
		return moodsHistory.find((entry) => entry.createdAt.split('T')[0] === today) || null;
	}, [moodsHistory]);

	return {todaysMood};
};
