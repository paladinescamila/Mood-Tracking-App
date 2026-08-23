interface StepsProgressProps {
	progress: number;
	total: number;
	className?: string;
}

export default function StepsProgress({progress, total, className = ''}: StepsProgressProps) {
	return (
		<div className={`flex flex-row items-center gap-4 ${className}`}>
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
