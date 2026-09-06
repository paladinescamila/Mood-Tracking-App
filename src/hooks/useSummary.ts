import {useMemo} from 'react';
import {useAppStore} from '@/stores/app';
import {MOODS_VALUES} from '@/constants/moods';
import {SLEEP_HOURS_VALUES} from '@/constants/sleepHours';
import {getTrend} from '@/utils/getTrend';
import {getAverageOfDefinedValues} from '@/utils/getAverageOfDefinedValues';
import {getNumericAverage} from '@/utils/getNumericAverage';
import {AVERAGES_LAST_CHECKINS} from '@/constants/dashboard';

export const useSummary = () => {
	const {moodsHistory} = useAppStore();

	const summary = useMemo<{
		averageMood: Mood | null;
		averageSleepHours: SleepHours | null;
		moodTrend: Trend | null;
		sleepHoursTrend: Trend | null;
	}>(() => {
		// A comparison needs the current five check-ins and five previous ones.
		if (moodsHistory.length < AVERAGES_LAST_CHECKINS) {
			return {
				averageMood: null,
				averageSleepHours: null,
				moodTrend: null,
				sleepHoursTrend: null,
			};
		}

		const recentMoods = moodsHistory.slice(-AVERAGES_LAST_CHECKINS);
		const previousMoods = moodsHistory.slice(-AVERAGES_LAST_CHECKINS * 2, -AVERAGES_LAST_CHECKINS);

		// Calculate average mood
		const allMoods = recentMoods.map((entry) => entry.mood);
		const averageMood = getAverageOfDefinedValues(allMoods, MOODS_VALUES) || null;

		// Calculate average sleep hours
		const allSleepHours = recentMoods.map((entry) => entry.sleepHours);
		const averageSleepHours = getAverageOfDefinedValues(allSleepHours, SLEEP_HOURS_VALUES) || null;

		// Determine mood trend
		const previousMoodAverage = getNumericAverage(
			previousMoods.map((entry) => entry.mood),
			MOODS_VALUES,
		);

		const recentMoodAverage = getNumericAverage(allMoods, MOODS_VALUES);

		const moodTrend =
			previousMoods.length === AVERAGES_LAST_CHECKINS &&
			previousMoodAverage !== null &&
			recentMoodAverage !== null
				? getTrend([previousMoodAverage, recentMoodAverage])
				: null;

		// Determine sleep hours trend
		const previousAverageSleep = getNumericAverage(
			previousMoods.map((entry) => entry.sleepHours),
			SLEEP_HOURS_VALUES,
		);

		const recentSleepAverage = getNumericAverage(allSleepHours, SLEEP_HOURS_VALUES);

		const sleepHoursTrend =
			previousMoods.length === AVERAGES_LAST_CHECKINS &&
			previousAverageSleep !== null &&
			recentSleepAverage !== null
				? getTrend([previousAverageSleep, recentSleepAverage])
				: null;

		return {
			averageMood,
			averageSleepHours,
			moodTrend,
			sleepHoursTrend,
		};
	}, [moodsHistory]);

	return summary;
};
