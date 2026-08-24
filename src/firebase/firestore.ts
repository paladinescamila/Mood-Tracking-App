import {firestore} from '@/firebase/config';
import {collection, doc, getDoc, getDocs} from 'firebase/firestore';

export const getUser = async (userID: string): Promise<User | null> => {
	const userDocRef = doc(firestore, 'users', userID);
	const userDocSnap = await getDoc(userDocRef);

	if (userDocSnap.exists()) return userDocSnap.data() as User;
	else return null;
};

export const getUserMoods = async (userID: string): Promise<MoodEntry[]> => {
	const moodsCollectionRef = collection(firestore, 'users', userID, 'moods');
	const moodsSnapshot = await getDocs(moodsCollectionRef);
	const moodsList: MoodEntry[] = [];

	moodsSnapshot.forEach((doc) => moodsList.push(doc.data() as MoodEntry));

	return moodsList;
};
