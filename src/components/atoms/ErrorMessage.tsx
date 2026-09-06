import Icon from '@/components/atoms/Icon';

interface ErrorMessageProps {
	error?: string;
	className?: string;
	id?: string;
}

export default function ErrorMessage({error, className = '', id}: ErrorMessageProps) {
	if (!error) return null;

	return (
		<div id={id} role='alert' className={`flex flex-row items-center gap-1.5 ${className}`}>
			<Icon icon='hint' />
			<span className='text-red-700 text-preset-9'>{error}</span>
		</div>
	);
}
