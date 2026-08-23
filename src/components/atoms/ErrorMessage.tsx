import React from 'react';
import Icon from './Icon';

interface ErrorMessageProps extends React.HTMLAttributes<HTMLDivElement> {
	error?: string;
	className?: string;
}

export default function ErrorMessage({error, className, ...props}: ErrorMessageProps) {
	if (!error) return null;

	return (
		<div className={`flex flex-row items-center gap-1.5 ${className || ''}`} {...props}>
			<Icon icon='hint' />
			<span className='text-red-700 text-preset-9'>{error}</span>
		</div>
	);
}
