import {DAYS, MONTHS} from '@/constants/time';

/**
 * Returns a string representation of the given date in the format "Wednesday, April 16th, 2025".
 * @param date - The date to be formatted.
 * @returns A string representation of the date.
 */
export const getDateText = (date: Date): string => {
	const day = DAYS[date.getDay()];
	const month = MONTHS[date.getMonth()];
	const dayOfMonth = date.getDate();
	const year = date.getFullYear();

	return `${day}, ${month} ${dayOfMonth}, ${year}`;
};
