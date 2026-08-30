import BGPatterAverages from '@/assets/bg-pattern-averages.svg';
import Icon from '@/components/atoms/Icon';

interface AverageCardProps {
	icon?: React.ReactNode;
	label?: string;
	trend?: Trend;
	textColor?: 'white' | 'black';
	type?: 'mood' | 'sleep';
	className?: string;
}

export default function AverageCard({
	icon,
	label,
	trend,
	textColor = 'white',
	type = 'mood',
	className = '',
}: AverageCardProps) {
	if (!label || !trend)
		return (
			<div className='p-5 pr-15 rounded-[20px] flex flex-col justify-center gap-3 relative overflow-hidden w-full min-h-37.5 bg-blue-100'>
				<p className='text-preset-4 text-neutral-900'>Keep tracking!</p>
				<p className='text-preset-7 text-neutral-900 opacity-70'>
					{type === 'mood'
						? 'Log 5 check-ins to see your average mood.'
						: 'Track 5 nights to view average sleep.'}
				</p>
				<img
					src={BGPatterAverages}
					alt='Background pattern for averages'
					className='absolute top-1/2 -right-45 -translate-y-1/2'
				/>
			</div>
		);

	return (
		<div
			className={`p-5 pr-15 rounded-[20px] flex flex-col justify-center gap-3 relative overflow-hidden w-full min-h-37.5 ${className}`}>
			<div className='flex flex-row gap-4 items-center'>
				{icon}
				<p
					className={`text-preset-4 ${textColor === 'white' ? 'text-neutral-0' : 'text-neutral-900'}`}>
					{label}
				</p>
			</div>
			<div className={`flex flex-row gap-2 ${type === 'sleep' ? 'opacity-70' : ''}`}>
				<Icon
					icon={
						trend === 'increase'
							? 'trend-increase'
							: trend === 'decrease'
								? 'trend-decrease'
								: 'trend-same'
					}
					color={type === 'sleep' ? 'white' : 'original'}
					className='w-4 h-5'
				/>
				<p
					className={`text-preset-7 ${textColor === 'white' ? 'text-neutral-0' : 'text-neutral-900'}`}>
					{trend === 'increase'
						? 'Increase from the previous 5 check-ins'
						: trend === 'decrease'
							? 'Decrease from the previous 5 check-ins'
							: 'Same as the previous 5 check-ins'}
				</p>
			</div>
			<img
				src={BGPatterAverages}
				alt='Background pattern for averages'
				className='absolute top-1/2 -right-45 -translate-y-1/2'
			/>
		</div>
	);
}
