import {createPortal} from 'react-dom';

interface WindowProps {
	children: React.ReactNode;
	className?: string;
}

export default function Window({children, className}: WindowProps) {
	return createPortal(
		<div className='flex items-center justify-center absolute inset-0 bg-neutral-900/70'>
			<div
				className={`custom-gradient rounded-2xl px-5 py-8 md:px-10 md:py-12 w-full md:max-w-150 ${className}`}>
				{children}
			</div>
		</div>,
		document.body,
	);
}
