import {MOODS} from '@/constants/moods';
import {FEELINGS} from '@/constants/feelings';
import {SLEEP_HOURS} from '@/constants/sleepHours';
import {generateID} from '@/utils/generateID';

/**
 * Generates an array of random MoodEntry objects for testing purposes (last n days, excluding today).
 * @param count - The number of random MoodEntry objects to generate.
 * @returns An array of random MoodEntry objects.
 */
export const getRandomMoods = (count: number): MoodEntry[] => {
	const randomMoods: Mood[] = [];

	for (let i = 0; i < count; i++) {
		const randomIndex = Math.floor(Math.random() * MOODS.length);
		randomMoods.push(MOODS[randomIndex]);
	}

	const lastDays = Array.from({length: count}, (_, i) => {
		const date = new Date();
		date.setDate(date.getDate() - (count - 1 - i));
		return date.toISOString();
	});

	let randomMoodsEntries = randomMoods.map((mood, index) => ({
		id: generateID(),
		createdAt: lastDays[index],
		mood,
		feelings: [FEELINGS[Math.floor(Math.random() * FEELINGS.length)]],
		journalEntry: 'This is a sample journal entry for testing purposes.',
		sleepHours: SLEEP_HOURS[Math.floor(Math.random() * SLEEP_HOURS.length)],
	}));

	randomMoodsEntries = randomMoodsEntries.filter(
		(entry) => entry.createdAt.split('T')[0] !== new Date().toISOString().split('T')[0],
	);

	return randomMoodsEntries;
};
