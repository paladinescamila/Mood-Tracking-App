import {useMemo} from 'react';
import {getRandomMoodQuote} from '@/utils/getRandomMoodQuote';
import {useTodaysMood} from '@/hooks/useTodaysMood';
import Card from '@/components/atoms/Card';
import Icon from '@/components/atoms/Icon';
import MoodIcon from '@/components/atoms/MoodIcon';
import {MOODS_DATA} from '@/constants/moods';
import {FEELINGS_DATA} from '@/constants/feelings';

export default function TodaysMood() {
	const {todaysMood} = useTodaysMood();

	const moodQuote = useMemo(() => getRandomMoodQuote(todaysMood?.mood || 'neutral'), [todaysMood]);

	if (!todaysMood) {
		return null;
	}

	return (
		<section className='grid xl:grid-cols-[670px_1fr] xl:grid-rows-[max-content_1fr] gap-x-8 gap-y-5 mt-8'>
			<Card className='relative md:min-w-167.5 md:h-85 overflow-hidden flex flex-col items-center md:items-start md:justify-between row-span-2 gap-8'>
				<div className='flex flex-col'>
					<p className='text-preset-3 opacity-70 text-neutral-900 text-center md:text-start'>
						I’m feeling
					</p>
					<p className='text-preset-2 text-neutral-900 text-center md:text-start'>
						{MOODS_DATA[todaysMood.mood].name}
					</p>
				</div>
				<MoodIcon
					mood={todaysMood.mood}
					className='md:absolute w-50 h-50 md:w-80 md:h-80 top-12.5 right-10'
				/>
				<div className='flex flex-col gap-3 items-center md:items-start'>
					<Icon icon='quote' className='w-6 h-6' alt='Quote icon' />
					<p className='text-preset-6-italic text-neutral-900 w-60 text-center md:text-start'>
						“{moodQuote}”
					</p>
				</div>
			</Card>
			<Card className='gap-4'>
				<div className='flex flex-row gap-3'>
					<Icon icon='sleep' className='w-5.5 h-5.5' alt='Sleep icon' />
					<p className='text-preset-6 text-neutral-600'>Sleep</p>
				</div>
				<p className='text-preset-3 text-neutral-900'>{todaysMood.sleepHours} hours</p>
			</Card>
			<Card className='gap-4'>
				<div className='flex flex-row gap-3'>
					<Icon icon='reflection' className='w-5.5 h-5.5' alt='Reflection icon' />
					<p className='text-preset-6 text-neutral-600'>Reflection of the day</p>
				</div>
				<p className='text-preset-6 text-neutral-900 h-full'>{todaysMood.journalEntry}</p>
				<div className='flex flex-row gap-x-3 gap-y-1 flex-wrap'>
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
