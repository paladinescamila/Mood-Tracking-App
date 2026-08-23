interface ScreenProps {
	children?: React.ReactNode;
	className?: string;
}

export default function Screen({children, className = ''}: ScreenProps) {
	return (
		<main className={`custom-gradient w-full min-h-dvh flex flex-col p-4 ${className}`}>
			{children}
		</main>
	);
}
