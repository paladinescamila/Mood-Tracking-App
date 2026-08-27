import {useEffect, useRef} from 'react';
import {MOODS_DATA} from '@/constants/moods';
import {getDateSplitted} from '@/utils/getDateSplitted';
import {MONTHS} from '@/constants/time';
import {SLEEP_HOURS_TO_SHOW} from '@/constants/sleepHours';
import Card from '@/components/atoms/Card';
import Icon from '@/components/atoms/Icon';
import MoodIcon from '@/components/atoms/MoodIcon';
import {useAppStore} from '@/stores/app';

export default function Chart() {
	const {moodsHistory: moods} = useAppStore();

	const chartRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const element = chartRef.current;

		if (!element) return;

		element.scrollLeft = element.scrollWidth;
	}, [moods.length]);

	return (
		<Card className='gap-8 flex-1 min-w-0 overflow-hidden'>
			<h2 className='text-preset-3-mobile md:text-preset-3 text-neutral-900'>
				Mood and sleep trends
			</h2>

			<div className='relative flex w-full min-w-0'>
				<div className='absolute inset-0 flex flex-col gap-10 pointer-events-none'>
					{SLEEP_HOURS_TO_SHOW.map((sleepHour) => (
						<div key={sleepHour} className='relative flex flex-row items-center gap-1.5'>
							<Icon icon='sleep' className='w-2.5 h-2.5 shrink-0' />

							<p className='text-preset-9 text-neutral-600 text-nowrap mr-3 shrink-0'>
								{sleepHour}
							</p>

							<div className='w-full h-px bg-blue-100' />
						</div>
					))}
				</div>

				<div
					ref={chartRef}
					className='flex-1 min-w-0 h-78 ml-13 pt-1 pb-4 overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-neutral-0'>
					<div className='flex flex-row gap-5 h-full w-max'>
						{moods.map((mood, index) => (
							<div key={index} className='flex flex-col justify-end gap-2.5 z-10 shrink-0'>
								<div
									className={`rounded-4xl w-10 flex justify-center p-1.25
										${MOODS_DATA[mood.mood].bgClass}
										${
											mood.sleepHours === '0-2'
												? 'h-13'
												: mood.sleepHours === '3-4'
													? 'h-26'
													: mood.sleepHours === '5-6'
														? 'h-39'
														: mood.sleepHours === '7-8'
															? 'h-52'
															: 'h-full'
										}
									`}>
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
				</div>
			</div>
		</Card>
	);
}
