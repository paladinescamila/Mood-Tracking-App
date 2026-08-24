import React from 'react';

interface TitleProps {
	children: React.ReactNode;
	className?: string;
}

export default function Title({children, className = ''}: TitleProps) {
	return (
		<h2 className={`text-preset-3-mobile md:text-preset-3 text-neutral-900 ${className}`}>
			{children}
		</h2>
	);
}
