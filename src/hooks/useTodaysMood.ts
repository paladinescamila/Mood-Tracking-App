import {useMemo} from 'react';
import {useAppStore} from '@/stores/app';
import {isToday} from '@/utils/checkIsToday';

export const useTodaysMood = () => {
	const {moodsHistory} = useAppStore();

	const todaysMood = useMemo(
		() => moodsHistory.find((entry) => isToday(new Date(entry.createdAt))) || null,
		[moodsHistory],
	);

	return {todaysMood};
};
