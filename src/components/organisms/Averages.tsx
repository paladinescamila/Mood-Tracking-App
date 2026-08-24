import {AVERAGES_LAST_CHECKINS} from '@/constants/dashboard';
import {MOODS_DATA} from '@/constants/moods';
import Card from '@/components/atoms/Card';
import Icon from '@/components/atoms/Icon';
import AverageCard from '@/components/molecules/AverageCard';
import MoodIcon from '@/components/atoms/MoodIcon';
import {useSummary} from '@/hooks/useSummary';

export default function Averages() {
	const {averageMood, moodTrend, averageSleepHours, sleepHoursTrend} = useSummary();

	return (
		<Card className='gap-6 w-92.5'>
			<div className='flex flex-col gap-3'>
				<p className='text-preset-5 text-neutral-900'>
					Average Mood{' '}
					<span className='text-preset-7 text-neutral-600'>
						(Last {AVERAGES_LAST_CHECKINS} Check-ins)
					</span>
				</p>
				<AverageCard
					icon={
						averageMood ? (
							<MoodIcon mood={averageMood} mode='white' className='w-6 h-6' />
						) : undefined
					}
					label={averageMood ? MOODS_DATA[averageMood].name : undefined}
					trend={moodTrend || undefined}
					className={averageMood ? MOODS_DATA[averageMood].bgClass : undefined}
					textColor='black'
					type='mood'
				/>
			</div>

			<div className='flex flex-col gap-3'>
				<p className='text-preset-5 text-neutral-900'>
					Average Sleep{' '}
					<span className='text-preset-7 text-neutral-600'>
						(Last {AVERAGES_LAST_CHECKINS} Check-ins)
					</span>
				</p>
				<AverageCard
					icon={averageSleepHours ? <Icon icon='sleep' className='w-6 h-6' /> : undefined}
					label={averageSleepHours ? `${averageSleepHours} Hours` : undefined}
					trend={sleepHoursTrend || undefined}
					className={averageSleepHours && sleepHoursTrend ? 'bg-blue-600' : undefined}
					type='sleep'
				/>
			</div>
		</Card>
	);
}
