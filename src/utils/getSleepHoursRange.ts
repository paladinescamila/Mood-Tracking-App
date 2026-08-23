/**
 * Takes a number representing sleep hours and returns a string representing the range of sleep hours.
 * @param value - The number of sleep hours.
 * @returns A string representing the range of sleep hours.
 */
export const getSleepHoursRange = (value: number): SleepHours => {
	if (value <= 2) return '0-2';
	if (value <= 4) return '3-4';
	if (value <= 6) return '5-6';
	if (value <= 8) return '7-8';
	return '9+';
};
