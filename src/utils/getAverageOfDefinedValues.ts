/**
 * Calculates the average of defined values based on a mapping and returns the closest value to the average.
 * @param values - An array of values to calculate the average from.
 * @param mapping - A record that maps each value to a corresponding number.
 * @returns The value from the input array that is closest to the average of the defined values, or null if no defined values exist.
 */
export const getAverageOfDefinedValues = <T extends string>(
	values: T[],
	mapping: Record<T, number>,
): T | null => {
	const definedValues = values.filter((value) => mapping[value] !== undefined);

	if (definedValues.length === 0) {
		return null;
	}

	const averageValue =
		definedValues.reduce((sum, value) => sum + mapping[value], 0) / definedValues.length;

	const closestValue = definedValues.reduce((prev, curr) =>
		Math.abs(mapping[curr] - averageValue) < Math.abs(mapping[prev] - averageValue) ? curr : prev,
	);

	return closestValue;
};
