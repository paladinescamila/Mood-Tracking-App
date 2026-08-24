import BGPatterAverages from '@/assets/bg-pattern-averages.svg';
import Icon from '@/components/atoms/Icon';

export default function AverageCard({
	icon,
	label,
	trend,
	textColor = 'white',
	className = '',
}: {
	icon: React.ReactNode;
	label: string;
	trend: Trend;
	textColor?: 'white' | 'black';
	className?: string;
}) {
	return (
		<div
			className={`p-5 pr-15 rounded-[20px] flex flex-col justify-center gap-3 relative overflow-hidden w-80 min-h-37.5 ${className}`}>
			<div className='flex flex-row gap-4 items-center'>
				{icon}
				<p
					className={`text-preset-4 ${textColor === 'white' ? 'text-neutral-0' : 'text-neutral-900'}`}>
					{label}
				</p>
			</div>
			<div className='flex flex-row gap-2'>
				<Icon
					icon={
						trend === 'increase'
							? 'trend-increase'
							: trend === 'decrease'
								? 'trend-decrease'
								: 'trend-same'
					}
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
