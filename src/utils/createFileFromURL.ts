/**
 * Creates a File object from a given URL and file name.
 * @param url - The URL of the file to be fetched and converted into a File object.
 * @param fileName - The desired name for the resulting File object.
 * @returns A Promise that resolves to a File object created from the fetched data.
 */
export const createFileFromURL = async (url: string, fileName: string): Promise<File> => {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
	}

	const blob = await response.blob();
	return new File([blob], fileName, {type: blob.type});
};
