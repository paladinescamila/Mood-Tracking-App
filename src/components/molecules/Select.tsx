import {useId} from 'react';
import Tag from '@/components/atoms/Tag';
import Title from '@/components/atoms/Title';
import SubTitle from '@/components/atoms/SubTitle';

interface SelectProps<T extends string> {
	label: string;
	description?: string;
	options: Option<T>[];
	value: T | null;
	onChange: (value: T) => void;
}

export default function Select<T extends string>({
	label = '',
	description = '',
	options,
	value,
	onChange,
}: SelectProps<T>) {
	const labelId = useId();

	return (
		<fieldset className='flex flex-col gap-6 md:gap-8' aria-labelledby={labelId}>
			<legend id={labelId} className='flex flex-col gap-1.5'>
				<Title as='span'>{label}</Title>
				{description && <SubTitle>{description}</SubTitle>}
			</legend>
			<ul className='flex flex-col gap-3'>
				{options.map((option) => (
					<li key={option.value} className='w-full'>
						<Tag
							role='radio'
							aria-checked={value === option.value}
							name={option.label}
							icon={option.icon}
							checked={value === option.value}
							onClick={() => onChange(option.value)}
							className='w-full!'
						/>
					</li>
				))}
			</ul>
		</fieldset>
	);
}
