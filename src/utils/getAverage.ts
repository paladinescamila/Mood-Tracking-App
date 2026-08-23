/**
 * Calculates the average of an array of numbers.
 * @param values An array of numerical values to average.
 * @returns The average of the values, or `null` if the array is empty.
 */

export const getAverage = (values: number[]): number => {
	if (values.length === 0) return 0;

	const total = values.reduce((sum, value) => sum + value, 0);
	return total / values.length;
};
