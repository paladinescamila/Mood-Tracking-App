import {useId} from 'react';
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
	const generatedId = useId();
	const inputId = props.id || generatedId;
	const errorId = `${inputId}-error`;

	return (
		<div className='flex flex-col gap-1.5'>
			{label ? (
				<label htmlFor={inputId} className='text-preset-6-regular text-neutral-900'>
					{label}
				</label>
			) : null}
			<input
				{...props}
				id={inputId}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				aria-invalid={error ? true : undefined}
				aria-describedby={error ? errorId : undefined}
				className={`px-4 py-3 text-preset-6 text-neutral-900 bg-neutral-0 rounded-[10px] custom-outline border border-neutral-300 hover:border-neutral-600 ${error ? 'border-red-700' : ''} ${className}`}
			/>
			<ErrorMessage id={errorId} error={error} />
		</div>
	);
}
