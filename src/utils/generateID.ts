/**
 * Generates a unique ID by combining the current timestamp and a random string.
 * @returns {string} A unique ID in the format "timestamp-randomString".
 */
export const generateID = (size: number = 36): string => {
	const timestamp = Date.now().toString(36); // Convert the current timestamp to base 36

	const randomString = Array.from({length: size}, () =>
		Math.floor(Math.random() * 36).toString(36),
	).join(''); // Generate a random string of the specified size

	return `${timestamp}-${randomString}`; // Combine timestamp and random string to form the unique ID
};
