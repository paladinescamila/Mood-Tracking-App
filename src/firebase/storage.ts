import {storage} from '@/firebase/config';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';

export const uploadFile = async (file: File, path: string): Promise<string> => {
	const storageRef = ref(storage, path);
	await uploadBytes(storageRef, file);
	const downloadURL = await getDownloadURL(storageRef);
	return downloadURL;
};
