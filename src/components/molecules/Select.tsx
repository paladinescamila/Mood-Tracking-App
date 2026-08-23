import Tag from '@/components/atoms/Tag';

interface SelectProps<T extends string> {
	label: string;
	description?: string;
	options: Option<T>[];
	value: T;
	onChange: (value: T) => void;
}

export default function Select<T extends string>({
	label = '',
	description = '',
	options,
	value,
	onChange,
}: SelectProps<T>) {
	return (
		<div className='flex flex-col gap-6 md:gap-8'>
			<label className='flex flex-col gap-1.5'>
				<p className='text-preset-3 text-neutral-900'>{label}</p>
				{description && <p className='text-preset-6 text-neutral-600'>{description}</p>}
			</label>
			<ul className='flex flex-col gap-3'>
				{options.map((option) => (
					<li key={option.value} onClick={() => onChange(option.value)} className='w-full'>
						<Tag
							name={option.label}
							icon={option.icon}
							checked={value === option.value}
							className='w-full!'
						/>
					</li>
				))}
			</ul>
		</div>
	);
}
