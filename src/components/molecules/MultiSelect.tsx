import Tag from '@/components/atoms/Tag';

interface MultiSelectProps {
	label?: string;
	description?: string;
	options: Option[];
	value: string[];
	onChange: (value: string[]) => void;
}

export default function MultiSelect({
	label = '',
	description = '',
	options,
	value,
	onChange,
}: MultiSelectProps) {
	return (
		<div className='flex flex-col gap-6 md:gap-8'>
			<label className='flex flex-col gap-1.5'>
				<p className='text-preset-3 text-neutral-900'>{label}</p>
				{description && <p className='text-preset-6 text-neutral-600'>{description}</p>}
			</label>
			<ul className='flex flex-row flex-wrap gap-x-4 gap-y-3'>
				{options.map((option) => (
					<li key={option.value} onClick={() => onChange([...value, option.value])}>
						<Tag
							name={option.label}
							icon={option.icon}
							checked={value.includes(option.value)}
							checkStyle='square'
						/>
					</li>
				))}
			</ul>
		</div>
	);
}
