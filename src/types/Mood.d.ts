type MoodEntry = {
	createdAt: Date;
	mood: Mood;
	feelings: Feeling[];
	journalEntry: string;
	sleepHours: number;
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
