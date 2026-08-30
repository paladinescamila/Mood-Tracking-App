import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {sortMoodsHistory} from '@/utils/sortMoodsHistory';
import type {FirebaseUser} from '@/firebase/config';

interface AppState {
	authUser: FirebaseUser | null;
	setAuthUser: (authUser: FirebaseUser | null) => void;

	user: User | null;
	setUser: (user: User | null) => void;

	moodsHistory: MoodEntry[];
	setMoodsHistory: (moodsHistory: MoodEntry[]) => void;
	addMoodEntry: (moodEntry: MoodEntry) => void;
}

export const useAppStore = create<AppState>()(
	persist(
		(set) => ({
			// User
			authUser: null,
			setAuthUser: (authUser) => set({authUser}),

			user: null,
			setUser: (user) => set({user}),

			// Moods history
			moodsHistory: [],
			setMoodsHistory: (moodsHistory) => set({moodsHistory: sortMoodsHistory(moodsHistory)}),
			addMoodEntry: (moodEntry) =>
				set(({moodsHistory}) => ({moodsHistory: sortMoodsHistory([...moodsHistory, moodEntry])})),
		}),
		{
			name: 'app-storage',
			storage: createJSONStorage(() => localStorage),
		},
	),
);
