/**
 * Calculates the average of numeric values based on a mapping from string values to numbers.
 * @param values - An array of string values to be averaged.
 * @param mapping - A record that maps string values to their corresponding numeric values.
 * @returns The average of the numeric values, or null if there are no defined values.
 */
export const getNumericAverage = <T extends string>(values: T[], mapping: Record<T, number>) => {
	const definedValues = values
		.map((value) => mapping[value])
		.filter((value) => value !== undefined);

	if (definedValues.length === 0) return null;

	return definedValues.reduce((sum, value) => sum + value, 0) / definedValues.length;
};
