import MoodIcon from '@/components/atoms/MoodIcon';

export const MOODS: Mood[] = ['very-sad', 'sad', 'neutral', 'happy', 'very-happy'];

export const MOODS_DATA: Record<
	Mood,
	{name: string; color: number; value: number; bgClass: string}
> = {
	'very-happy': {name: 'Very Happy', color: 5, value: 5, bgClass: 'bg-amber-300'},
	happy: {name: 'Happy', color: 4, value: 4, bgClass: 'bg-green-300'},
	neutral: {name: 'Neutral', color: 3, value: 3, bgClass: 'bg-blue-300'},
	sad: {name: 'Sad', color: 2, value: 2, bgClass: 'bg-indigo-200'},
	'very-sad': {name: 'Very Sad', color: 1, value: 1, bgClass: 'bg-red-300'},
};

export const MOODS_OPTIONS: Option<Mood>[] = Object.entries(MOODS_DATA).map(([key, value]) => ({
	label: value.name,
	value: key as Mood,
	icon: <MoodIcon mood={key as Mood} className='w-9 h-9' />,
}));
