import {generateID} from '@/utils/generateID';

export const DEMO_USER: User = {
	id: 'QjemPXthw4cxCrL97KRnEftFoHi2',
	name: 'Lisa',
	email: 'lisa@mail.com',
	photo:
		'https://firebasestorage.googleapis.com/v0/b/mood-app-paladinescamila.firebasestorage.app/o/users%2FQjemPXthw4cxCrL97KRnEftFoHi2%2Fprofile.jpg?alt=media&token=24dc20c4-0e9b-4fb1-9eb6-0714ec776550',
};

export const DEMO_MOODS: MoodEntry[] = [
	{
		id: generateID(),
		createdAt: '2026-03-31T10:00:00Z',
		feelings: ['anxious', 'overwhelmed'],
		mood: 'sad',
		sleepHours: '5-6',
		journalEntry:
			'Feeling a bit down today. Work has been stressful, and I didn’t get enough sleep last night.',
	},
	{
		id: generateID(),
		createdAt: '2026-04-02T10:00:00Z',
		feelings: ['content'],
		mood: 'happy',
		sleepHours: '7-8',
		journalEntry: 'Had a great day! Spent time with friends and enjoyed a nice walk in the park.',
	},
	{
		id: generateID(),
		createdAt: '2026-04-04T10:00:00Z',
		feelings: ['frustrated', 'disappointed'],
		mood: 'very-sad',
		sleepHours: '3-4',
		journalEntry:
			'Feeling really down today. Nothing seems to be going right, and I’m struggling to stay positive.',
	},
	{
		id: generateID(),
		createdAt: '2026-04-06T10:00:00Z',
		feelings: ['calm', 'peaceful'],
		mood: 'neutral',
		sleepHours: '5-6',
		journalEntry:
			'Today was an average day. Nothing too exciting, but nothing too bad either. Just a regular day.',
	},
	{
		id: generateID(),
		createdAt: '2026-04-07T10:00:00Z',
		feelings: ['joyful', 'grateful'],
		mood: 'happy',
		sleepHours: '7-8',
		journalEntry:
			'Feeling really happy today! I accomplished a lot at work and had a great time with my family in the evening.',
	},
	{
		id: generateID(),
		createdAt: '2026-04-09T10:00:00Z',
		feelings: ['excited', 'motivated'],
		mood: 'very-happy',
		sleepHours: '9+',
		journalEntry:
			'Today was amazing! I received some great news and I’m feeling very optimistic about the future.',
	},
	{
		id: generateID(),
		createdAt: '2026-04-10T10:00:00Z',
		feelings: ['lonely', 'tired'],
		mood: 'sad',
		sleepHours: '3-4',
		journalEntry:
			'Feeling a bit down today. I didn’t sleep well last night and I’m feeling a bit isolated from my friends.',
	},
	{
		id: generateID(),
		createdAt: '2026-04-12T10:00:00Z',
		feelings: ['calm', 'peaceful'],
		mood: 'neutral',
		sleepHours: '7-8',
		journalEntry:
			'Today was a calm day. I spent some time meditating and reflecting on my goals for the future.',
	},
	{
		id: generateID(),
		createdAt: '2026-04-13T10:00:00Z',
		feelings: ['grateful', 'hopeful'],
		mood: 'happy',
		sleepHours: '7-8',
		journalEntry:
			'Feeling really happy today! I’m grateful for my friends and family and I’m hopeful about the future.',
	},
	{
		id: generateID(),
		createdAt: '2026-04-14T10:00:00Z',
		feelings: ['frustrated', 'disappointed'],
		mood: 'very-sad',
		sleepHours: '3-4',
		journalEntry:
			'Feeling really down today. I had a tough day at work and I’m struggling to stay positive.',
	},
	{
		id: generateID(),
		createdAt: '2026-04-15T10:00:00Z',
		feelings: ['excited', 'motivated'],
		mood: 'very-happy',
		sleepHours: '9+',
		journalEntry:
			'Today was an amazing day! I accomplished a lot and I’m feeling very optimistic about the future.',
	},
];
