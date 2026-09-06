import React from 'react';

interface TitleProps {
	children: React.ReactNode;
	className?: string;
	as?: 'h1' | 'h2' | 'span';
	id?: string;
}

export default function Title({children, className = '', as = 'h2', id}: TitleProps) {
	const titleClass = `text-preset-3-mobile md:text-preset-3 text-neutral-900 ${className}`;

	return as === 'span' ? (
		<span id={id} className={titleClass}>
			{children}
		</span>
	) : as === 'h1' ? (
		<h1 id={id} className={titleClass}>
			{children}
		</h1>
	) : (
		<h2 id={id} className={titleClass}>
			{children}
		</h2>
	);
}
