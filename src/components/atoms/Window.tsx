import {useEffect, useRef} from 'react';
import {createPortal} from 'react-dom';
import Icon from '@/components/atoms/Icon';
import {useClickOutside} from '@/hooks/useClickOutside';

interface WindowProps {
	children: React.ReactNode;
	className?: string;
	backgroundClassName?: string;
	onClose?: () => void;
	labelledBy?: string;
}

export default function Window({
	children,
	className,
	backgroundClassName = 'custom-gradient',
	onClose,
	labelledBy,
}: WindowProps) {
	const {ref} = useClickOutside(onClose);
	const closeButtonRef = useRef<HTMLButtonElement>(null);

	// Focus management and keyboard navigation
	useEffect(() => {
		const previousFocus = document.activeElement as HTMLElement | null;
		closeButtonRef.current?.focus();

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				event.preventDefault();
				onClose?.();
				return;
			}

			if (event.key !== 'Tab' || !ref.current) return;

			const focusableElements = ref.current.querySelectorAll<HTMLElement>(
				'button, input, textarea, select, a[href], [tabindex]:not([tabindex="-1"])',
			);
			const firstElement = focusableElements[0];
			const lastElement = focusableElements[focusableElements.length - 1];

			if (event.shiftKey && document.activeElement === firstElement) {
				event.preventDefault();
				lastElement?.focus();
			} else if (!event.shiftKey && document.activeElement === lastElement) {
				event.preventDefault();
				firstElement?.focus();
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			previousFocus?.focus();
		};
	}, [onClose, ref]);

	return createPortal(
		<div className='flex items-center justify-center absolute inset-0 bg-neutral-900/70 p-4 z-50'>
			<div
				role='dialog'
				aria-modal='true'
				aria-labelledby={labelledBy}
				aria-label={labelledBy ? undefined : 'Dialog'}
				className={`rounded-2xl px-5 py-8 md:px-10 md:py-12 w-full md:max-w-150 relative ${backgroundClassName} ${className}`}
				ref={ref}>
				<button
					ref={closeButtonRef}
					type='button'
					aria-label='Close dialog'
					className='absolute top-7.5 right-7.5 cursor-pointer'
					onClick={onClose}>
					<Icon icon='close' className='	w-3.75 h-3.75' />
				</button>
				{children}
			</div>
		</div>,
		document.body,
	);
}
