/**
 * Checks if the provided text is a valid email address.
 * @param text - The text to be checked for email validity.
 * @returns {boolean} True if the text is a valid email address, false otherwise.
 */
export const checkEmail = (text: string) =>
	/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(text);
