import Icon from '@/components/atoms/Icon';

interface ErrorMessageProps {
	error?: string;
	className?: string;
}

export default function ErrorMessage({error, className = ''}: ErrorMessageProps) {
	if (!error) return null;

	return (
		<div className={`flex flex-row items-center gap-1.5 ${className}`}>
			<Icon icon='hint' />
			<span className='text-red-700 text-preset-9'>{error}</span>
		</div>
	);
}
