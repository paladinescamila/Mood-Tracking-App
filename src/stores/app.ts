import {create} from 'zustand';

interface AppState {
	user: User | null;
	setUser: (user: User | null) => void;
	updateUser: (updates: Pick<User, 'name' | 'profilePicture'>) => void;

	todaysMood: MoodEntry | null;
	setTodaysMood: (mood: MoodEntry | null) => void;

	moodsHistory: MoodEntry[];
	addMoodEntry: (entry: MoodEntry) => void;
	editMoodEntry: (entryId: string, updates: Partial<MoodEntry>) => void;
	deleteMoodEntry: (entryId: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
	// User
	user: null,

	setUser: (user) => set({user}),

	updateUser: (updates) =>
		set((state) => ({user: state.user ? {...state.user, ...updates} : null})),

	// Today's mood
	todaysMood: null,

	setTodaysMood: (mood) => set({todaysMood: mood}),

	// Moods history
	moodsHistory: [],

	addMoodEntry: (entry) => set((state) => ({moodsHistory: [...state.moodsHistory, entry]})),

	editMoodEntry: (entryId, updates) =>
		set((state) => ({
			moodsHistory: state.moodsHistory.map((entry) =>
				entry.id === entryId ? {...entry, ...updates} : entry,
			),
		})),

	deleteMoodEntry: (entryId) =>
		set((state) => ({moodsHistory: state.moodsHistory.filter((entry) => entry.id !== entryId)})),
}));
