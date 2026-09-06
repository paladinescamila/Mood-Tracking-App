import Icon from '@/components/atoms/Icon';

interface TagProps {
	name: string;
	checked?: boolean;
	onClick?: () => void;
	checkStyle?: 'square' | 'circle';
	size?: 'small' | 'normal';
	icon?: React.ReactNode;
	className?: string;
	role?: React.AriaRole;
	'aria-checked'?: boolean;
}

export default function Tag({
	name,
	checked = false,
	onClick,
	checkStyle = 'circle',
	size = 'normal',
	icon,
	className = '',
	role,
	'aria-checked': ariaChecked,
}: TagProps) {
	return (
		<button
			type='button'
			role={role}
			aria-checked={ariaChecked}
			aria-pressed={checked}
			className={`flex flex-row items-center py-3 rounded-[10px] cursor-pointer bg-neutral-0 w-max border-2 ${size === 'small' ? 'gap-2 px-4 text-preset-6-regular' : 'gap-3 px-5 text-preset-5'} ${checked ? 'border-blue-600' : 'border-blue-100'} ${className}`}
			onClick={onClick}>
			{checkStyle === 'square' ? (
				<div
					className={`w-4 h-4 rounded-sm flex items-center justify-center border-[1.5px] ${checked ? 'border-blue-600 bg-blue-600' : 'border-blue-200'}`}>
					{checked ? <Icon icon='check' /> : null}
				</div>
			) : (
				<div
					className={`w-5 h-5 rounded-full ${checked ? 'border-5 border-blue-600' : 'border-2 border-blue-200'}`}></div>
			)}
			<span className='select-none'>{name}</span>
			{icon && <div className='ml-auto select-none'>{icon}</div>}
		</button>
	);
}
