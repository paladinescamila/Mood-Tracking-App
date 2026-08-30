/**
 * Sorts the moods history in descending order based on the createdAt date.
 * @param moodsHistory - An array of MoodEntry objects to be sorted.
 * @returns A new array of MoodEntry objects sorted in descending order by createdAt date.
 */
export const sortMoodsHistory = (moodsHistory: MoodEntry[]): MoodEntry[] =>
	moodsHistory.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
