/**
 * Checks if the given date is today.
 * @param date The date to check.
 * @returns True if the date is today, false otherwise.
 */
export const isToday = (date: Date) => {
	const today = new Date();

	return (
		date.getFullYear() === today.getFullYear() &&
		date.getMonth() === today.getMonth() &&
		date.getDate() === today.getDate()
	);
};
