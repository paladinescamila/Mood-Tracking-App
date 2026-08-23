import Tag from '@/components/atoms/Tag';
import Title from '../atoms/Title';

interface MultiSelectProps<T extends string> {
	label?: string;
	description?: string;
	options: Option<T>[];
	value: T[];
	onChange: (value: T[]) => void;
}

export default function MultiSelect<T extends string>({
	label = '',
	description = '',
	options,
	value,
	onChange,
}: MultiSelectProps<T>) {
	return (
		<div className='flex flex-col gap-6 md:gap-8'>
			<label className='flex flex-col gap-1.5'>
				<Title>{label}</Title>
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
