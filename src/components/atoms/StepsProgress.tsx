interface StepsProgressProps extends React.HTMLAttributes<HTMLDivElement> {
	progress: number;
	total: number;
	className?: string;
}

export default function StepsProgress({progress, total, className, ...props}: StepsProgressProps) {
	return (
		<div className={`flex flex-row items-center gap-4 ${className || ''}`} {...props}>
			{Array.from({length: total}, (_, index) => (
				<div
					key={index}
					className={`h-1.5 rounded-full ${index < progress ? 'bg-blue-600' : 'bg-blue-200'}`}
					style={{width: `${100 / total}%`}}
				/>
			))}
		</div>
	);
}
