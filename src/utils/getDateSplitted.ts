/**
 * Splits a Date object into its day, month, and year components.
 * @param date - The Date object to be split.
 * @returns An object containing the day, month, and year as numbers.
 */
export const getDateSplitted = (date: Date) => {
	const day = date.getDate();
	const month = date.getMonth();
	const year = date.getFullYear();

	return {day, month, year};
};
