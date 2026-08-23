import MoodIcon from '@/components/atoms/MoodIcon';

export const MOODS_OPTIONS: Option[] = [
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
