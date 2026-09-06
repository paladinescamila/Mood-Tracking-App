import React from 'react';

interface TitleProps {
	children: React.ReactNode;
	className?: string;
	as?: 'h1' | 'h2' | 'span';
}

export default function Title({children, className = '', as = 'h2'}: TitleProps) {
	const titleClass = `text-preset-3-mobile md:text-preset-3 text-neutral-900 ${className}`;

	return as === 'span' ? (
		<span className={titleClass}>{children}</span>
	) : as === 'h1' ? (
		<h1 className={titleClass}>{children}</h1>
	) : (
		<h2 className={titleClass}>{children}</h2>
	);
}
