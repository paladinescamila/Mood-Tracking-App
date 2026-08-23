import {MOOD_QUOTES} from '@/constants/moodQuotes';

/**
 * Returns a random quote based on the provided mood.
 * @param mood - The mood for which to retrieve a quote.
 * @returns A random quote corresponding to the given mood.
 */
export const getRandomMoodQuote = (mood: Mood): string => {
	const quotes = MOOD_QUOTES[mood];

	const randomIndex = Math.floor(Math.random() * quotes.length);
	return quotes[randomIndex];
};
