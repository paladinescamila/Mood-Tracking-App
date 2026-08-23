import ErrorMessage from '@/components/atoms/ErrorMessage';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
	label?: string;
	value: string;
	onChange: (value: string) => void;
	className?: string;
	error?: string;
}

export default function Input({
	label,
	value,
	onChange,
	className = '',
	error,
	...props
}: InputProps) {
	return (
		<div className='flex flex-col gap-1.5'>
			{label ? <label className='text-preset-6-regular text-neutral-900'>{label}</label> : null}
			<input
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className={`px-4 py-3 text-preset-6 text-neutral-900 bg-neutral-0 rounded-[10px] custom-outline border border-neutral-300 hover:border-neutral-600 ${error ? 'border-red-700' : ''} ${className}`}
				{...props}
			/>
			<ErrorMessage error={error} />
		</div>
	);
}
