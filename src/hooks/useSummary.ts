import {useMemo} from 'react';
import {useAppStore} from '@/stores/app';
import {MOODS, MOODS_VALUES} from '@/constants/moods';
import {getTrend} from '@/utils/getTrend';
import {getAverage} from '@/utils/getAverage';
import {getSleepHoursValue} from '@/utils/getSleepHoursValue';

export const useSummary = () => {
	const {todaysMood, moodsHistory} = useAppStore();

	const summary = useMemo<{
		averageMood: Mood | null;
		averageSleepHours: number | null;
		moodTrend: Trend | null;
		sleepHoursTrend: Trend | null;
	}>(() => {
		// If there's no mood data
		if (!todaysMood || moodsHistory.length === 0) {
			return {
				averageMood: null,
				averageSleepHours: null,
				moodTrend: null,
				sleepHoursTrend: null,
			};
		}

		// Calculate average mood
		const moodsValues = moodsHistory.map((entry) => MOODS_VALUES[entry.mood]);
		const averageMood = MOODS[Math.round(getAverage(moodsValues) || 0) - 1] || null;

		// Calculate average sleep hours
		const sleepHoursValues = moodsHistory.map((entry) => getSleepHoursValue(entry.sleepHours));
		const averageSleepHours = getAverage(sleepHoursValues) || null;

		// Determine trends based on the last 7 entries
		const recentMoodValues = moodsValues.slice(-7);
		const recentSleepHoursValues = sleepHoursValues.slice(-7);

		const moodTrend = getTrend(recentMoodValues);
		const sleepHoursTrend = getTrend(recentSleepHoursValues);

		return {
			averageMood,
			averageSleepHours,
			moodTrend,
			sleepHoursTrend,
		};
	}, [todaysMood, moodsHistory]);

	return summary;
};
