import Tag from '@/components/atoms/Tag';
import Title from '@/components/atoms/Title';

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
	const onCheckOption = (optionValue: T) => {
		if (value.includes(optionValue)) {
			onChange(value.filter((v) => v !== optionValue));
		} else {
			onChange([...value, optionValue]);
		}
	};

	return (
		<div className='flex flex-col gap-6 md:gap-8'>
			<label className='flex flex-col gap-1.5'>
				<Title>{label}</Title>
				{description && <p className='text-preset-6 text-neutral-600'>{description}</p>}
			</label>
			<ul className='flex flex-row flex-wrap gap-x-4 gap-y-3'>
				{options.map((option) => (
					<li key={option.value} onClick={() => onCheckOption(option.value)}>
						<Tag
							name={option.label}
							icon={option.icon}
							checked={value.includes(option.value)}
							checkStyle='square'
							size='small'
						/>
					</li>
				))}
			</ul>
		</div>
	);
}
