import {useMemo} from 'react';
import {useAppStore} from '@/stores/app';
import {MOODS, MOODS_DATA} from '@/constants/moods';
import {getTrend} from '@/utils/getTrend';
import {getAverage} from '@/utils/getAverage';
import {getSleepHoursValue} from '@/utils/getSleepHoursValue';
import {AVERAGES_LAST_CHECKINS} from '@/constants/dashboard';

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
		const moodsValues = moodsHistory.map((entry) => MOODS_DATA[entry.mood].value);
		const averageMood = MOODS[Math.round(getAverage(moodsValues) || 0) - 1] || null;

		// Calculate average sleep hours
		const sleepHoursValues = moodsHistory.map((entry) => getSleepHoursValue(entry.sleepHours));
		const averageSleepHours = getAverage(sleepHoursValues) || null;

		// Determine trends based on the last entries
		const recentMoodValues = moodsValues.slice(-AVERAGES_LAST_CHECKINS);
		const recentSleepHoursValues = sleepHoursValues.slice(-AVERAGES_LAST_CHECKINS);

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
