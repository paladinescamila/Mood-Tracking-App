/**
 * Checks if the provided photo file exceeds the maximum allowed size for profile photos.
 * @param file - The photo file to be checked.
 * @returns {boolean} True if the photo file exceeds the maximum size, false otherwise.
 */
export const checkPhotoExceedsLimit = (file: File | null): boolean => {
	if (!file) return false;

	const MAX_PROFILE_PHOTO_SIZE_KB = 250;
	return file.size / 1024 > MAX_PROFILE_PHOTO_SIZE_KB;
};
