import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {sortMoodsHistory} from '@/utils/sortMoodsHistory';
import type {FirebaseUser} from '@/firebase/config';
import {SAMPLE_MOODS_HISTORY, SAMPLE_USER} from '@/constants/sample';

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

			user: SAMPLE_USER,
			setUser: (user) => set({user}),

			// Moods history
			moodsHistory: SAMPLE_MOODS_HISTORY,
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
