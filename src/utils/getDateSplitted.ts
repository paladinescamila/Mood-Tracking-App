/**
 * Splits a Date object into its day, month, and year components.
 * @param date - The Date object to be split.
 * @returns An object containing the day, month, and year as numbers.
 */
export const getDateSplitted = (date: Date | string) => {
	const dateValue = new Date(date);

	const day = dateValue.getDate();
	const month = dateValue.getMonth();
	const year = dateValue.getFullYear();

	return {day, month, year};
};
