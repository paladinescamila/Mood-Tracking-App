/**
 * Creates a URL for a user's photo based on their user ID and the file name.
 * @param userId - The unique identifier of the user.
 * @param fileName - The name of the photo file.
 * @returns A string representing the URL for the user's photo in the storage.
 */
export const createUserPhotoURL = (userId: string, fileName: string): string =>
	`users/${userId}/${fileName}`;
