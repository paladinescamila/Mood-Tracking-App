interface SubTitleProps {
	children: React.ReactNode;
	className?: string;
}

export default function SubTitle({children, className = ''}: SubTitleProps) {
	return <p className={`text-preset-6-regular text-neutral-600 ${className}`}>{children}</p>;
}
