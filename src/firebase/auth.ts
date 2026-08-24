import {auth} from '@/firebase/config';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {signInWithEmailAndPassword} from 'firebase/auth';

export const createUser = async (email: string, password: string) => {
	const userCredential = await createUserWithEmailAndPassword(auth, email, password);
	return userCredential.user;
};

export const signIn = async (email: string, password: string) => {
	const userCredential = await signInWithEmailAndPassword(auth, email, password);
	return userCredential.user;
};
