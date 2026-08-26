import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import type {FirebaseUser} from '@/firebase/config';

interface AppState {
	authUser: FirebaseUser | null;
	setAuthUser: (authUser: FirebaseUser | null) => void;

	user: User | null;
	setUser: (user: User | null) => void;

	todaysMood: MoodEntry | null;
	setTodaysMood: (mood: MoodEntry | null) => void;

	moodsHistory: MoodEntry[];
	setMoodsHistory: (moods: MoodEntry[]) => void;
	addMoodEntry: (entry: MoodEntry) => void;
	editMoodEntry: (entryId: string, updates: Partial<MoodEntry>) => void;
	deleteMoodEntry: (entryId: string) => void;
}

export const useAppStore = create<AppState>()(
	persist(
		(set) => ({
			// User
			authUser: null,
			setAuthUser: (authUser) => set({authUser}),

			user: null,

			setUser: (user) => set({user}),

			// Today's mood
			todaysMood: null,

			setTodaysMood: (mood) => set({todaysMood: mood}),

			// Moods history
			moodsHistory: [],

			setMoodsHistory: (moods) => set({moodsHistory: moods}),

			addMoodEntry: (entry) => set((state) => ({moodsHistory: [...state.moodsHistory, entry]})),

			editMoodEntry: (entryId, updates) =>
				set((state) => ({
					moodsHistory: state.moodsHistory.map((entry) =>
						entry.id === entryId ? {...entry, ...updates} : entry,
					),
				})),

			deleteMoodEntry: (entryId) =>
				set((state) => ({
					moodsHistory: state.moodsHistory.filter((entry) => entry.id !== entryId),
				})),
		}),
		{
			name: 'app-storage',
			storage: createJSONStorage(() => localStorage),
		},
	),
);
