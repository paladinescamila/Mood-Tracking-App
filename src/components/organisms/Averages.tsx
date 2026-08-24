import Card from '@/components/atoms/Card';
import Icon from '@/components/atoms/Icon';
import AverageCard from '@/components/molecules/AverageCard';
import MoodIcon from '@/components/atoms/MoodIcon';
import {AVERAGES_LAST_CHECKINS} from '@/constants/dashboard';
import {MOODS_DATA} from '@/constants/moods';

export default function Averages({
	mood,
	moodTrend,
	sleepHours,
	sleepHoursTrend,
}: {
	mood?: Mood;
	moodTrend?: Trend;
	sleepHours?: SleepHours;
	sleepHoursTrend?: Trend;
}) {
	if (!mood || !sleepHours || !moodTrend || !sleepHoursTrend) {
		return null;
	}

	return (
		<Card className='gap-6'>
			<div className='flex flex-col gap-3'>
				<p className='text-preset-5 text-neutral-900'>
					Average Mood{' '}
					<span className='text-preset-7 text-neutral-600'>
						(Last {AVERAGES_LAST_CHECKINS} Check-ins)
					</span>
				</p>
				<AverageCard
					icon={<MoodIcon mood={mood} mode='white' className='w-6 h-6' />}
					label={MOODS_DATA[mood].name}
					trend={moodTrend}
					className={MOODS_DATA[mood].bgClass}
					textColor='black'
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
					icon={<Icon icon='sleep' className='w-6 h-6' />}
					label={`${sleepHours} Hours`}
					trend={sleepHoursTrend}
					className='bg-blue-600'
				/>
			</div>
		</Card>
	);
}
