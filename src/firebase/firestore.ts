import {firestore} from '@/firebase/config';
import {collection, doc, getDoc, setDoc, getDocs} from 'firebase/firestore';

export const getUser = async (userID: string): Promise<User | null> => {
	const userDocRef = doc(firestore, 'users', userID);
	const userDocSnap = await getDoc(userDocRef);

	if (userDocSnap.exists()) return userDocSnap.data() as User;
	else return null;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
	const usersCollectionRef = collection(firestore, 'users');
	const querySnapshot = await getDocs(usersCollectionRef);

	for (const doc of querySnapshot.docs) {
		const user = doc.data() as User;
		if (user.email === email) return user;
	}

	return null;
};

export const createUser = async (user: User): Promise<void> => {
	const userDocRef = doc(firestore, 'users', user.id);
	await setDoc(userDocRef, user);
};

export const getUserMoods = async (userID: string): Promise<MoodEntry[]> => {
	const moodsCollectionRef = collection(firestore, 'users', userID, 'moods');
	const moodsSnapshot = await getDocs(moodsCollectionRef);
	const moodsList: MoodEntry[] = [];

	moodsSnapshot.forEach((doc) => moodsList.push(doc.data() as MoodEntry));

	return moodsList;
};

export const addUserMood = async (userID: string, moodEntry: MoodEntry): Promise<void> => {
	const moodDocRef = doc(firestore, 'users', userID, 'moods', moodEntry.id);
	await setDoc(moodDocRef, moodEntry);
};
