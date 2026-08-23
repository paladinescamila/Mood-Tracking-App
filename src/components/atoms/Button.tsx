interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
	children: React.ReactNode;
	type: 'primary' | 'secondary';
	className?: string;
	disabled?: boolean;
}

export default function Button({children, type, className, disabled, ...props}: ButtonProps) {
	return (
		<button
			className={`${type === 'primary' ? 'px-8 py-3 rounded-xl text-preset-5 text-neutral-0 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-200' : ' px-4 py-2 rounded-lg text-preset-6 text-neutral-900 border border-neutral-300 hover:border-neutral-900 disabled:text-neutral-300 disabled:border-neutral-300'} custom-outline cursor-pointer disabled:cursor-not-allowed ${className || ''}`}
			{...props}
			disabled={disabled}>
			{children}
		</button>
	);
}
