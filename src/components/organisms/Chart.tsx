import Card from '@/components/atoms/Card';
import {SLEEP_HOURS} from '@/constants/sleepHours';
import Icon from '@/components/atoms/Icon';
import MoodIcon from '@/components/atoms/MoodIcon';
import {MOODS_DATA} from '@/constants/moods';
import {getDateSplitted} from '@/utils/getDateSplitted';
import {MONTHS} from '@/constants/time';

export default function Chart({moods}: {moods: MoodEntry[]}) {
	return (
		<Card className='gap-8 w-max'>
			<h2 className='text-preset-3 text-neutral-900'>Mood and sleep trends</h2>
			<div className='flex flex-row gap-5 relative h-78 pl-18 pt-1.25'>
				<div className='flex flex-col gap-10 absolute inset-0'>
					{SLEEP_HOURS.reverse().map((sleepHour) => (
						<div key={sleepHour} className='flex flex-row items-center gap-1.5 relative'>
							<Icon icon='sleep' className='w-2.5 h-2.5' />
							<p className='text-preset-9 text-neutral-600 text-nowrap mr-3'>{sleepHour}</p>
							<div className='w-full h-px bg-blue-100' />
						</div>
					))}
				</div>
				{moods.map((mood, index) => (
					<div key={index} className='flex flex-col justify-end gap-2.5 z-10'>
						<div
							className={`${MOODS_DATA[mood.mood].bgClass} rounded-4xl w-10 flex justify-center p-1.25 ${
								mood.sleepHours === '0-2'
									? 'h-13'
									: mood.sleepHours === '3-4'
										? 'h-26'
										: mood.sleepHours === '5-6'
											? 'h-39'
											: mood.sleepHours === '7-8'
												? 'h-52'
												: 'h-full'
							}`}>
							<MoodIcon mood={mood.mood} mode='white' className='w-7.5 h-7.5' />
						</div>
						<div className='flex flex-col gap-1.5 items-center'>
							<p className='text-preset-9 text-neutral-900'>
								{MONTHS[getDateSplitted(mood.createdAt).month]}
							</p>
							<p className='text-preset-8 text-neutral-900'>
								{getDateSplitted(mood.createdAt).day}
							</p>
						</div>
					</div>
				))}
			</div>
		</Card>
	);
}
