type MoodEntry = {
	id: string;
	createdAt: Date;
	mood: Mood;
	feelings: Feeling[];
	journalEntry: string;
	sleepHours: SleepHours;
};

type Mood = 'very-happy' | 'happy' | 'neutral' | 'sad' | 'very-sad';

type Feeling =
	| 'joyful'
	| 'down'
	| 'anxious'
	| 'calm'
	| 'excited'
	| 'frustrated'
	| 'lonely'
	| 'grateful'
	| 'overwhelmed'
	| 'motivated'
	| 'irritable'
	| 'peaceful'
	| 'tired'
	| 'hopeful'
	| 'confident'
	| 'stressed'
	| 'content'
	| 'disappointed'
	| 'optimistic'
	| 'restless';

type SleepHours = '0-2' | '3-4' | '5-6' | '7-8' | '9+';
