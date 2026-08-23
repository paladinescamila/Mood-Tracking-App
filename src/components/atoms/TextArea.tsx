interface TextAreaProps extends Omit<
	React.TextareaHTMLAttributes<HTMLTextAreaElement>,
	'onChange' | 'value'
> {
	value: string;
	onChange: (value: string) => void;
	className?: string;
	limit?: number;
}

export default function TextArea({value, onChange, className, limit, ...props}: TextAreaProps) {
	return (
		<div className='flex flex-col gap-2'>
			<textarea
				className={`bg-neutral-0 px-4 py-3 rounded-xl custom-outline border border-neutral-300 hover:border-neutral-600 resize-none ${className}`}
				{...props}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				rows={5}
			/>
			{limit ? (
				<p className='text-preset-8 text-neutral-600 self-end'>
					{value.length}/{limit}
				</p>
			) : null}
		</div>
	);
}
