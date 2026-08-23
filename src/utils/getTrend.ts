/**
 * Calculates the trend of a series of numerical values.
 * @param values An array of numerical values to analyze.
 * @returns A `Trend` indicating whether the values are increase, decrease, or same, or `null` if the trend cannot be determined.
 */
export const getTrend = (values: number[]): Trend | null => {
	if (values.length < 2) return null;

	const firstValue = values[0];
	const lastValue = values[values.length - 1];

	if (lastValue > firstValue) return 'increase';
	else if (lastValue < firstValue) return 'decrease';
	else return 'same';
};
