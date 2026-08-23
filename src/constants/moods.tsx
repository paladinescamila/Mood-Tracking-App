import MoodIcon from '@/components/atoms/MoodIcon';

export const MOODS: Mood[] = ['very-sad', 'sad', 'neutral', 'happy', 'very-happy'];

export const MOODS_VALUES: Record<Mood, number> = {
	'very-happy': 5,
	happy: 4,
	neutral: 3,
	sad: 2,
	'very-sad': 1,
};

export const MOODS_OPTIONS: Option<Mood>[] = [
	{
		label: 'Very Happy',
		value: 'very-happy',
		icon: <MoodIcon mood='very-happy' mode='color' className='w-9 h-9' />,
	},
	{
		label: 'Happy',
		value: 'happy',
		icon: <MoodIcon mood='happy' mode='color' className='w-9 h-9' />,
	},
	{
		label: 'Neutral',
		value: 'neutral',
		icon: <MoodIcon mood='neutral' mode='color' className='w-9 h-9' />,
	},
	{
		label: 'Sad',
		value: 'sad',
		icon: <MoodIcon mood='sad' mode='color' className='w-9 h-9' />,
	},
	{
		label: 'Very Sad',
		value: 'very-sad',
		icon: <MoodIcon mood='very-sad' mode='color' className='w-9 h-9' />,
	},
];
