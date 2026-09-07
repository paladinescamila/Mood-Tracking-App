interface ScreenProps {
	children?: React.ReactNode;
	className?: string;
}

export default function Screen({children, className = ''}: ScreenProps) {
	return (
		<main
			id='page-main'
			tabIndex={-1}
			className={`custom-gradient w-full min-h-dvh flex flex-col p-4 ${className} outline-none`}>
			{children}
		</main>
	);
}
