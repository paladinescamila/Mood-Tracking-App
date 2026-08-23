/**
 * Converts a sleep hours range to its corresponding numeric value.
 * @param range - The sleep hours range (e.g., '0-2', '3-4', '5-6', '7-8', '9+').
 * @returns The numeric value corresponding to the sleep hours range.
 */
export const getSleepHoursValue = (range: SleepHours): number => {
	if (range === '0-2') return 1;
	if (range === '3-4') return 3.5;
	if (range === '5-6') return 5.5;
	if (range === '7-8') return 7.5;
	return 9;
};
