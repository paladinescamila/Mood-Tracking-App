interface CardProps {
	children: React.ReactNode;
	className?: string;
}

export default function Card({children, className}: CardProps) {
	return (
		<div className={`px-4 md:px-8 py-10 rounded-2xl bg-neutral-0 card-shadow ${className}`}>
			{children}
		</div>
	);
}
