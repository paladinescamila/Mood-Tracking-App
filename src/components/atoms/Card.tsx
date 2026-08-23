interface CardProps {
	children: React.ReactNode;
	className?: string;
}

export default function Card({children, className}: CardProps) {
	return (
		<div
			className={`px-4 py-5 md:px-5 md:py-6 lg:px-6 rounded-2xl bg-neutral-0 border border-blue-100 flex flex-col ${className}`}>
			{children}
		</div>
	);
}
