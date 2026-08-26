import {useMemo} from 'react';
import {getRandomMoodQuote} from '@/utils/getRandomMoodQuote';
import {useAppStore} from '@/stores/app';
import Card from '@/components/atoms/Card';
import Icon from '@/components/atoms/Icon';
import MoodIcon from '@/components/atoms/MoodIcon';
import {MOODS_DATA} from '@/constants/moods';
import {FEELINGS_DATA} from '@/constants/feelings';

export default function TodaysMood() {
	const {todaysMood} = useAppStore();

	const moodQuote = useMemo(() => getRandomMoodQuote(todaysMood?.mood || 'neutral'), [todaysMood]);

	if (!todaysMood) {
		return null;
	}

	return (
		<section className='grid grid-cols-[670px_1fr] grid-rows-[max-content_1fr] gap-x-8 gap-y-5 mt-8'>
			<Card className='relative min-w-167.5 h-85 overflow-hidden flex flex-col justify-between row-span-2'>
				<div className='flex flex-col'>
					<p className='text-preset-3 opacity-70 text-neutral-900'>I’m feeling</p>
					<p className='text-preset-2 text-neutral-900'>{MOODS_DATA[todaysMood.mood].name}</p>
				</div>
				<div className='flex flex-col gap-3'>
					<Icon icon='quote' className='w-6 h-6' />
					<p className='text-preset-6-italic text-neutral-900 w-60'>{moodQuote}</p>
				</div>
				<MoodIcon mood={todaysMood.mood} className='absolute w-80 h-80 top-12.5 right-10' />
			</Card>
			<Card className='gap-4'>
				<div className='flex flex-row gap-3'>
					<Icon icon='sleep' className='w-5.5 h-5.5' />
					<p className='text-preset-6 text-neutral-600'>Sleep</p>
				</div>
				<p className='text-preset-3 text-neutral-900'>{todaysMood.sleepHours} hours</p>
			</Card>
			<Card className='gap-4'>
				<div className='flex flex-row gap-3'>
					<Icon icon='reflection' className='w-5.5 h-5.5' />
					<p className='text-preset-6 text-neutral-600'>Reflection of the day</p>
				</div>
				<p className='text-preset-6 text-neutral-900 h-full'>{todaysMood.journalEntry}</p>
				<div className='flex flex-row gap-3 flex-wrap'>
					{todaysMood.feelings.map((feeling, index) => (
						<p key={index} className='text-preset-6-italic text-neutral-600'>
							#{FEELINGS_DATA[feeling].name}
						</p>
					))}
				</div>
			</Card>
		</section>
	);
}
