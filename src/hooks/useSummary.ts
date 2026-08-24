import {useMemo} from 'react';
import {useAppStore} from '@/stores/app';
import {MOODS_VALUES} from '@/constants/moods';
import {SLEEP_HOURS_VALUES} from '@/constants/sleepHours';
import {getTrend} from '@/utils/getTrend';
import {getAverageOfDefinedValues} from '@/utils/getAverageOfDefinedValues';
import {AVERAGES_LAST_CHECKINS} from '@/constants/dashboard';

export const useSummary = () => {
	const {moodsHistory} = useAppStore();

	const summary = useMemo<{
		averageMood: Mood | null;
		averageSleepHours: SleepHours | null;
		moodTrend: Trend | null;
		sleepHoursTrend: Trend | null;
	}>(() => {
		// If there's no mood data
		if (moodsHistory.length === 0) {
			return {
				averageMood: null,
				averageSleepHours: null,
				moodTrend: null,
				sleepHoursTrend: null,
			};
		}

		const limit = -AVERAGES_LAST_CHECKINS;

		// Calculate average mood
		const allMoods = moodsHistory.map((entry) => entry.mood).slice(limit);
		const averageMood = getAverageOfDefinedValues(allMoods, MOODS_VALUES) || null;

		// Calculate average sleep hours
		const allSleepHours = moodsHistory.map((entry) => entry.sleepHours).slice(limit);
		const averageSleepHours = getAverageOfDefinedValues(allSleepHours, SLEEP_HOURS_VALUES) || null;

		// Determine mood trend
		const recentMoodValues = allMoods.map((mood) => MOODS_VALUES[mood]);
		const moodTrend = getTrend(recentMoodValues);

		// Determine sleep hours trend
		const recentSleepHoursValues = allSleepHours.map((hours) => SLEEP_HOURS_VALUES[hours]);
		const sleepHoursTrend = getTrend(recentSleepHoursValues);

		return {
			averageMood,
			averageSleepHours,
			moodTrend,
			sleepHoursTrend,
		};
	}, [moodsHistory]);

	return summary;
};
