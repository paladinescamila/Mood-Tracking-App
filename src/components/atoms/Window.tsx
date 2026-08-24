import {createPortal} from 'react-dom';
import Icon from '@/components/atoms/Icon';

interface WindowProps {
	children: React.ReactNode;
	className?: string;
	onClose?: () => void;
}

export default function Window({children, className, onClose}: WindowProps) {
	return createPortal(
		<div className='flex items-center justify-center absolute inset-0 bg-neutral-900/70 p-4'>
			<div
				className={`custom-gradient rounded-2xl px-5 py-8 md:px-10 md:py-12 w-full md:max-w-150 relative ${className}`}>
				<button className='absolute top-7.5 right-7.5 cursor-pointer' onClick={onClose}>
					<Icon icon='close' className='	w-3.75 h-3.75' />
				</button>
				{children}
			</div>
		</div>,
		document.body,
	);
}
