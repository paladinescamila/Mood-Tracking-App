import {useEffect, useMemo, useRef, useState} from 'react';
import {MOODS_DATA} from '@/constants/moods';
import {getDateSplitted} from '@/utils/getDateSplitted';
import {MONTHS_SHORT} from '@/constants/time';
import {SLEEP_HOURS_TO_SHOW} from '@/constants/sleepHours';
import Card from '@/components/atoms/Card';
import Icon from '@/components/atoms/Icon';
import MoodIcon from '@/components/atoms/MoodIcon';
import {useAppStore} from '@/stores/app';
import {FEELINGS_DATA} from '@/constants/feelings';
import {CHART_MAX_RENDERED_ITEMS} from '@/constants/dashboard';

type TooltipPlacement = 'left' | 'right' | 'center';

export default function Chart() {
	const {moodsHistory: moods} = useAppStore();

	const chartRef = useRef<HTMLDivElement>(null);
	const [tooltipPlacements, setTooltipPlacements] = useState<Record<number, TooltipPlacement>>({});
	const [selectedTooltipIndex, setSelectedTooltipIndex] = useState<number | null>(null);

	const updateTooltipPlacement = (index: number, element: HTMLDivElement) => {
		const chart = chartRef.current;

		if (!chart) return;

		const chartBounds = chart.getBoundingClientRect();
		const itemBounds = element.getBoundingClientRect();

		const spaceOnLeft = itemBounds.left - chartBounds.left;
		const spaceOnRight = chartBounds.right - itemBounds.right;

		const requiredSpace = 172 + 8 + 1; // tooltip width + gap + 1px for shadow

		const placement =
			spaceOnLeft >= requiredSpace ? 'left' : spaceOnRight >= requiredSpace ? 'right' : 'center';

		setTooltipPlacements((current) => ({...current, [index]: placement}));
	};

	const toggleTooltip = (index: number, element: HTMLDivElement) => {
		updateTooltipPlacement(index, element);
		setSelectedTooltipIndex((current) => (current === index ? null : index));
	};

	useEffect(() => {
		const element = chartRef.current;

		if (!element) return;

		element.scrollLeft = element.scrollWidth;
	}, [moods.length]);

	const renderedMoods = useMemo(() => moods.slice(-CHART_MAX_RENDERED_ITEMS), [moods]);

	return (
		<Card className='gap-8 flex-1 min-w-0 overflow-hidden'>
			<h2 className='text-preset-3-mobile md:text-preset-3 text-neutral-900'>
				Mood and sleep trends
			</h2>

			<div className='relative flex w-full min-w-0'>
				<div className='absolute inset-0 flex flex-col gap-10 pointer-events-none'>
					{SLEEP_HOURS_TO_SHOW.map((sleepHour) => (
						<div key={sleepHour} className='relative flex flex-row items-center gap-1.5'>
							<Icon icon='sleep' className='w-2.5 h-2.5 shrink-0' alt='Sleep icon' />

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
						{renderedMoods.map((entry, index) => (
							<div
								key={index}
								id={`chart-entry-${entry.id}`}
								onMouseEnter={(event) => updateTooltipPlacement(index, event.currentTarget)}
								onClick={(event) => toggleTooltip(index, event.currentTarget)}
								onKeyDown={(event) => {
									if (event.key === 'Enter' || event.key === ' ') {
										event.preventDefault();
										toggleTooltip(index, event.currentTarget);
									}
								}}
								role='button'
								tabIndex={0}
								aria-expanded={selectedTooltipIndex === index}
								aria-controls={`chart-details-${entry.id}`}
								aria-label={`Show details for ${getDateSplitted(entry.createdAt).month + 1}/${getDateSplitted(entry.createdAt).day}`}
								className={`flex flex-col justify-end gap-2.5 shrink-0 relative group ${selectedTooltipIndex === index ? 'z-20' : 'z-10 hover:z-20'}`}>
								<div
									className={`rounded-4xl w-10 flex justify-center p-1.25
										${MOODS_DATA[entry.mood].bgClass}
										${
											entry.sleepHours === '0-2'
												? 'h-13'
												: entry.sleepHours === '3-4'
													? 'h-26'
													: entry.sleepHours === '5-6'
														? 'h-39'
														: entry.sleepHours === '7-8'
															? 'h-52'
															: 'h-full'
										}
									`}>
									<MoodIcon mood={entry.mood} mode='white' className='w-7.5 h-7.5' />
								</div>

								<div className='flex flex-col gap-1.5 items-center'>
									<p className='text-preset-9 text-neutral-900'>
										{MONTHS_SHORT[getDateSplitted(entry.createdAt).month]}
									</p>

									<p className='text-preset-8 text-neutral-900'>
										{getDateSplitted(entry.createdAt).day}
									</p>
								</div>
								<div
									id={`chart-details-${entry.id}`}
									role='region'
									aria-labelledby={`chart-details-label-${entry.id}`}
									aria-hidden={selectedTooltipIndex === index ? undefined : true}
									className={`${selectedTooltipIndex === index ? 'flex' : 'hidden group-hover:flex'} absolute w-43 h-auto flex-col gap-3 p-3 rounded-[10px] bg-neutral-0 top-2 chart-tooltip-shadow ${
										tooltipPlacements[index] === 'right'
											? 'left-[calc(100%+8px)]'
											: tooltipPlacements[index] === 'center'
												? 'left-1/2 -translate-x-1/2'
												: 'right-[calc(100%+8px)]'
									}`}>
									<div className='flex flex-col gap-1.5'>
										<p
											id={`chart-details-label-${entry.id}`}
											className='text-preset-8 text-neutral-600'>
											Mood details
										</p>
										<div className='flex flex-row gap-1.5'>
											<MoodIcon mood={entry.mood} className='w-4 h-4' />
											<p className='text-preset-7 text-neutral-900'>
												{MOODS_DATA[entry.mood].name}
											</p>
										</div>
									</div>
									<div className='flex flex-col gap-1.5'>
										<p className='text-preset-8 text-neutral-600'>Sleep</p>
										<p className='text-preset-7 text-neutral-900'>{entry.sleepHours} hours</p>
									</div>
									<div className='flex flex-col gap-1.5'>
										<p className='text-preset-8 text-neutral-600'>Reflection</p>
										<p className='text-preset-9 text-neutral-900'>{entry.journalEntry}</p>
									</div>
									<div className='flex flex-col gap-1.5'>
										<p className='text-preset-8 text-neutral-600'>Tags</p>
										<p className='flex flex-row gap-1.5 text-preset-9 text-neutral-900'>
											{entry.feelings.map((tag) => FEELINGS_DATA[tag].name).join(', ')}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</Card>
	);
}
