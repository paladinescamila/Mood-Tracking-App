import {useId} from 'react';
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
	const labelId = useId();

	const onCheckOption = (optionValue: T) => {
		if (value.includes(optionValue)) {
			onChange(value.filter((v) => v !== optionValue));
		} else {
			onChange([...value, optionValue]);
		}
	};

	return (
		<fieldset className='flex flex-col' aria-labelledby={labelId}>
			<legend id={labelId} className='flex flex-col gap-1.5 mb-6 md:mb-8'>
				<Title as='span'>{label}</Title>
				{description && <p className='text-preset-6 text-neutral-600'>{description}</p>}
			</legend>
			<ul className='flex flex-row flex-wrap gap-x-4 gap-y-3'>
				{options.map((option) => (
					<li key={option.value}>
						<Tag
							name={option.label}
							icon={option.icon}
							checked={value.includes(option.value)}
							onClick={() => onCheckOption(option.value)}
							controlType='checkbox'
							inputName={labelId}
							value={option.value}
							size='small'
						/>
					</li>
				))}
			</ul>
		</fieldset>
	);
}
